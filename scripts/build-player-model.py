#!/usr/bin/env python3
"""Build the small, original Kahani Player presentation GLB with stdlib only.

This is an approximate visual model based on the supplied manufacturing PNGs,
not manufacturing CAD. Y up, front +Z, ground y=0; units are metres.
"""
from __future__ import annotations
import argparse
import hashlib
import json
import math
from pathlib import Path
import struct

TAU = math.tau

def add(a, b): return tuple(x+y for x, y in zip(a, b))
def sub(a, b): return tuple(x-y for x, y in zip(a, b))
def mul(a, n): return tuple(x*n for x in a)
def dot(a, b): return sum(x*y for x, y in zip(a, b))
def cross(a, b): return (a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0])
def unit(a):
    length = math.sqrt(dot(a, a))
    return mul(a, 1/length) if length > 1e-12 else (0., 1., 0.)
def linear_hex(value):
    rgb = [int(value[i:i+2], 16)/255 for i in (0, 2, 4)]
    return [x/12.92 if x <= .04045 else ((x+.055)/1.055)**2.4 for x in rgb]

class Mesh:
    def __init__(self, name, material):
        self.name, self.material = name, material
        self.positions, self.normals, self.indices = [], [], []
    def vertex(self, position, normal):
        self.positions.append(tuple(position)); self.normals.append(unit(normal))
        return len(self.positions)-1
    def triangle(self, a, b, c):
        face = cross(sub(self.positions[b], self.positions[a]), sub(self.positions[c], self.positions[a]))
        if dot(face, face) < 1e-22: return
        average = add(add(self.normals[a], self.normals[b]), self.normals[c])
        if dot(face, average) < 0: b, c = c, b
        self.indices.extend((a, b, c))
    def quad(self, a, b, c, d):
        self.triangle(a, b, c); self.triangle(a, c, d)


def lathe(name, material, profile, segments=64):
    mesh = Mesh(name, material)
    for row, (radius, y) in enumerate(profile):
        before = profile[max(0, row-1)]; after = profile[min(len(profile)-1, row+1)]
        dr, dy = after[0]-before[0], after[1]-before[1]
        for i in range(segments+1):
            angle = i/segments*TAU; c, s = math.cos(angle), math.sin(angle)
            mesh.vertex((radius*c, y, radius*s), (dy*c, -dr, dy*s))
    for row in range(len(profile)-1):
        for i in range(segments):
            a = row*(segments+1)+i; b = a+segments+1
            mesh.quad(a, b, b+1, a+1)
    return mesh


def cylinder(mesh, center, normal, radius, depth, segments=24):
    """Append an axis-aligned-to-normal cylinder with separate cap normals."""
    n = unit(normal)
    u = unit(cross((0, 1, 0) if abs(n[1]) < .95 else (1, 0, 0), n)); v = cross(n, u)
    rings = []
    for side in (-1, 1):
        ring = []
        for i in range(segments):
            a = i/segments*TAU; radial = add(mul(u, math.cos(a)), mul(v, math.sin(a)))
            ring.append(mesh.vertex(add(add(center, mul(n, side*depth/2)), mul(radial, radius)), radial))
        rings.append(ring)
    for i in range(segments): mesh.quad(rings[0][i], rings[1][i], rings[1][(i+1)%segments], rings[0][(i+1)%segments])
    for side in (-1, 1):
        capcenter = add(center, mul(n, side*depth/2)); cn = mul(n, side)
        middle = mesh.vertex(capcenter, cn); ring = []
        for i in range(segments):
            a=i/segments*TAU; ring.append(mesh.vertex(add(capcenter, add(mul(u, math.cos(a)*radius), mul(v, math.sin(a)*radius))), cn))
        for i in range(segments): mesh.triangle(middle, ring[i], ring[(i+1)%segments])


def stroke(mesh, start, end, radius=.00055, segments=6):
    direction = sub(end, start); length = math.sqrt(dot(direction, direction))
    cylinder(mesh, mul(add(start, end), .5), direction, radius, length, segments)


def handle():
    mesh = Mesh('Arch carry handle', 'housing')
    # Eight-point bevelled rectangular section, white strap rather than wire.
    cross_section = [(-.004,-.003),(-.003,-.004),(.003,-.004),(.004,-.003),(.004,.003),(.003,.004),(-.003,.004),(-.004,.003)]
    rows = 64
    for i in range(rows+1):
        angle = i/rows*math.pi
        center = (.080*math.cos(angle), .170+.145*math.sin(angle), -.001)
        outward = unit((.145*math.cos(angle), .080*math.sin(angle), 0))
        for u, v in cross_section:
            mesh.vertex(add(center, add(mul(outward, u), (0,0,v))), add(mul(outward, u/.004), (0,0,v/.004)))
    count=len(cross_section)
    for row in range(rows):
        for i in range(count): mesh.quad(row*count+i, (row+1)*count+i, (row+1)*count+(i+1)%count, row*count+(i+1)%count)
    for row, sign in [(0, -1),(rows, 1)]:
        ids=[row*count+i for i in range(count)]
        for i in range(1,count-1):mesh.triangle(ids[0],ids[i],ids[i+1])
    return mesh


def light_ring():
    mesh=Mesh('Recessed top cyan light arcs', 'light')
    for start, end in [(12,168),(192,348)]:
        rows=48; tube=8
        for i in range(rows+1):
            theta=math.radians(start+(end-start)*i/rows)
            for j in range(tube+1):
                phi=j/tube*TAU; radial=.023+.00065*math.cos(phi)
                mesh.vertex((radial*math.cos(theta), .226+.00065*math.sin(phi), radial*math.sin(theta)), (math.cos(theta)*math.cos(phi), math.sin(phi), math.sin(theta)*math.cos(phi)))
        base=(len(mesh.positions)-(rows+1)*(tube+1))
        for i in range(rows):
            for j in range(tube):
                a=base+i*(tube+1)+j;b=a+tube+1;mesh.quad(a,b,b+1,a+1)
    return mesh


def make_model():
    meshes=[]
    meshes.append(lathe('Wood-toned base', 'wood', [(0,0),(.067,0),(.073,.002),(.077,.007),(.078,.016),(.078,.023),(.076,.026),(0,.026)]))
    meshes.append(lathe('Gulab Red speaker band', 'gulab', [(0,.025),(.076,.025),(.078,.028),(.078,.094),(.0775,.098),(0,.098)]))
    meshes.append(lathe('Rounded white housing and rim', 'housing', [(0,.096),(.077,.096),(.078,.100),(.078,.207),(.0778,.214),(.0764,.220),(.073,.225),(.067,.229),(.062,.230),(.060,.227),(.060,.224),(0,.224)]))
    meshes.append(lathe('Blank recessed Koel top plate', 'plate', [(0,.224),(.0595,.224),(.060,.225),(.0595,.2258),(0,.2258)]))
    meshes.append(handle()); meshes.append(light_ring())
    pivots=Mesh('Handle pivot discs', 'housing')
    for sign in (-1,1):cylinder(pivots,(sign*.079,.170,-.001),(sign,0,0),.0115,.005,32)
    meshes.append(pivots)
    controls=Mesh('Five tactile control buttons', 'buttons'); glyphs=Mesh('Raised control glyphs', 'glyph')
    for title, x, y, radius in [('plus',0,.184,.0098),('previous',-.028,.151,.0102),('play-pause',0,.151,.0135),('next',.028,.151,.0102),('minus',0,.117,.0098)]:
        z=math.sqrt(.078**2-x*x); normal=unit((x,0,z)); center=(x,y,z+.0011)
        cylinder(controls,center,normal,radius,.0022,32)
        u=unit((normal[2],0,-normal[0]));v=(0,1,0)
        front=add(center,mul(normal,.00145))
        def point(a,b):return add(front,add(mul(u,a),mul(v,b)))
        if title=='plus':
            stroke(glyphs,point(-.005,0),point(.005,0));stroke(glyphs,point(0,-.005),point(0,.005))
        elif title=='minus':stroke(glyphs,point(-.005,0),point(.005,0))
        else:
            direction=-1 if title=='previous' else 1
            offset=-.0017 if title=='play-pause' else 0
            triangle=[point(offset-direction*.0034,.005),point(offset+direction*.0046,0),point(offset-direction*.0034,-.005)]
            for i in range(3):stroke(glyphs,triangle[i],triangle[(i+1)%3])
            if title=='play-pause':stroke(glyphs,point(.0063,-.005),point(.0063,.005),.00065)
    meshes.extend([controls,glyphs])
    # Small recessed-looking apertures give the band physical surface structure.
    grille=Mesh('Speaker surface apertures', 'grille')
    for row in range(7):
        y=.033+row*.009
        for i in range(48):
            angle=(i+(row%2)*.5)/48*TAU; normal=(math.cos(angle),0,math.sin(angle))
            cylinder(grille,(.07805*normal[0],y,.07805*normal[2]),normal,.00072,.00018,6)
    meshes.append(grille)
    # Fine warm seams on the wooden base, as geometry rather than image texture.
    for n, y in enumerate((.007,.012,.019)):
        meshes.append(lathe(f'Wood fine grain ring {n+1}', 'woodgrain', [(.07805,y-.00022),(.07815,y),(.07805,y+.00022)],64))
    return meshes


def material(name, hexcolor, roughness, metallic=0, emissive=None):
    result={'name':name,'pbrMetallicRoughness':{'baseColorFactor':linear_hex(hexcolor)+[1],'metallicFactor':metallic,'roughnessFactor':roughness}}
    if emissive:result['emissiveFactor']=emissive
    return result


def write_glb(path, meshes):
    materials=[material('Warm white moulded housing','F5F3EE',.42),material('Gulab Red woven speaker band #D3000A','D3000A',.91),material('Natural wood base','C79661',.62),material('Recessed matte white top plate','E9E7E2',.58),material('Tactile warm-white controls','F2F0EA',.51),material('Embossed control symbols','C9C7C1',.57),material('Fine speaker aperture recesses','8F0007',.98),material('Subtle wooden grain seams','AB7B4A',.78),material('Cyan status light','8CF9F1',.22,emissive=[.12,.65,.58])]
    ids={key:i for i,key in enumerate(['housing','gulab','wood','plate','buttons','glyph','grille','woodgrain','light'])}
    doc={'asset':{'version':'2.0','generator':'Hey Kahani deterministic procedural model builder','copyright':'Original presentation approximation based on user-supplied Kahani manufacturing references'},'scene':0,'scenes':[{'name':'Kahani Player production presentation','nodes':list(range(len(meshes)))}],'nodes':[],'meshes':[],'materials':materials,'accessors':[],'bufferViews':[],'buffers':[{'byteLength':0}],'extras':{'units':'metres','upAxis':'+Y','frontAxis':'+Z','isManufacturingCAD':False,'source':'docs/product-reference/manufacturing-front-angle.png','topPlateCenter':[0,.2258,0],'topPlateUsableRadius':.0595,'productionSpeakerColor':'#D3000A'}}
    binary=bytearray()
    def accessor(values, component, kind, target):
        while len(binary)%4:binary.append(0)
        offset=len(binary); flat=[n for value in values for n in (value if isinstance(value,tuple) else (value,))]
        fmt={5126:'f',5123:'H',5125:'I'}[component]
        binary.extend(struct.pack('<'+fmt*len(flat),*flat))
        doc['bufferViews'].append({'buffer':0,'byteOffset':offset,'byteLength':len(binary)-offset,'target':target})
        item={'bufferView':len(doc['bufferViews'])-1,'componentType':component,'count':len(values),'type':kind}
        if kind=='VEC3':item.update(min=[min(v[i] for v in values) for i in range(3)],max=[max(v[i] for v in values) for i in range(3)])
        doc['accessors'].append(item);return len(doc['accessors'])-1
    for mesh in meshes:
        assert len(mesh.positions)==len(mesh.normals)
        assert all(math.isfinite(n) for v in mesh.positions+mesh.normals for n in v)
        assert all(0<=i<len(mesh.positions) for i in mesh.indices)
        pos=accessor(mesh.positions,5126,'VEC3',34962);normal=accessor(mesh.normals,5126,'VEC3',34962)
        indices=accessor(mesh.indices,5123 if len(mesh.positions)<65536 else 5125,'SCALAR',34963)
        doc['nodes'].append({'name':mesh.name,'mesh':len(doc['meshes'])})
        doc['meshes'].append({'name':mesh.name,'primitives':[{'attributes':{'POSITION':pos,'NORMAL':normal},'indices':indices,'material':ids[mesh.material],'mode':4}]})
    doc['buffers'][0]['byteLength']=len(binary)
    js=json.dumps(doc,separators=(',',':'),sort_keys=True).encode();js+=b' '*((-len(js))%4)
    binary+=b'\0'*((-len(binary))%4)
    total=12+8+len(js)+8+len(binary)
    path.parent.mkdir(parents=True,exist_ok=True)
    path.write_bytes(struct.pack('<4sII',b'glTF',2,total)+struct.pack('<I4s',len(js),b'JSON')+js+struct.pack('<I4s',len(binary),b'BIN\0')+binary)
    return doc


def validate(path):
    data=path.read_bytes();magic,version,total=struct.unpack_from('<4sII',data)
    assert magic==b'glTF' and version==2 and total==len(data)
    json_length,json_type=struct.unpack_from('<I4s',data,12);assert json_type==b'JSON' and json_length%4==0
    doc=json.loads(data[20:20+json_length]);bin_start=20+json_length
    bin_length,bin_type=struct.unpack_from('<I4s',data,bin_start);assert bin_type==b'BIN\0' and bin_length%4==0
    binary=data[bin_start+8:];assert len(binary)==bin_length
    assert doc['buffers'][0]['byteLength']<=bin_length and bin_length-doc['buffers'][0]['byteLength']<4
    counts={5126:(4,'f'),5123:(2,'H'),5125:(4,'I')};types={'VEC3':3,'SCALAR':1}
    for acc in doc['accessors']:
        view=doc['bufferViews'][acc['bufferView']];size,fmt=counts[acc['componentType']]
        assert view['byteOffset']%4==0
        assert view['byteLength']==acc['count']*types[acc['type']]*size
        assert view['byteOffset']+view['byteLength']<=len(binary)
        values=struct.unpack_from('<'+fmt*(view['byteLength']//size),binary,view['byteOffset'])
        assert all(math.isfinite(v) for v in values)
        if acc['type']=='VEC3':
            for axis in range(3):
                tolerance=1e-6
                assert abs(min(values[axis::3])-acc['min'][axis])<tolerance
                assert abs(max(values[axis::3])-acc['max'][axis])<tolerance
    triangles=0
    for mesh in doc['meshes']:
        for primitive in mesh['primitives']:
            pos=doc['accessors'][primitive['attributes']['POSITION']];idx=doc['accessors'][primitive['indices']];view=doc['bufferViews'][idx['bufferView']]
            fmt=counts[idx['componentType']][1];indices=struct.unpack_from('<'+fmt*idx['count'],binary,view['byteOffset'])
            assert idx['count']%3==0 and max(indices)<pos['count'];triangles+=idx['count']//3
    posaccess=[doc['accessors'][p['attributes']['POSITION']] for m in doc['meshes'] for p in m['primitives']]
    bounds={'min':[min(a['min'][i] for a in posaccess) for i in range(3)],'max':[max(a['max'][i] for a in posaccess) for i in range(3)]}
    assert bounds['min'][1]>=-1e-6 and triangles<30000 and len(data)<500_000
    return {'bytes':len(data),'meshes':len(doc['meshes']),'triangles':triangles,'bounds':bounds,'topPlateCenter':doc['extras']['topPlateCenter'],'sha256':hashlib.sha256(data).hexdigest()}


def main():
    parser=argparse.ArgumentParser();parser.add_argument('--output',type=Path,default=Path(__file__).resolve().parents[1]/'frontend/assets/models/kahani-player.glb');args=parser.parse_args()
    write_glb(args.output,make_model());print(json.dumps(validate(args.output),indent=2))
if __name__=='__main__':main()
