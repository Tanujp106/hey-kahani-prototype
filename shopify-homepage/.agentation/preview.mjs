import { Agentation } from 'agentation';
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

const mount = document.createElement('div');
document.body.append(mount);

createRoot(mount).render(createElement(Agentation, {
  endpoint: 'http://localhost:4747',
}));
