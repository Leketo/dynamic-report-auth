import { Router } from 'express';
import glob from 'glob';
import { container } from 'tsyringe';

interface IRequest {
  register: (data: Router) => void;
}

function register(routePath: string, router: Router) {
  const { default: Route } = require(routePath);
  const route = container.resolve(Route) as IRequest;
  route.register(router);
}

export function registerRoutes(router: Router) {
  const routes = glob.sync(__dirname.replace(/\\/g, '/') + '/**/*.route.*');
  routes.map((route) => register(route, router));
}
