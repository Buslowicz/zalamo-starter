import { Route, Routes } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class NamedRoutes {
  public static map = new Map<string, Route>();

  public static getAll(pattern): Array<{name: string, route: Route}> {
    return Array
      .from(NamedRoutes.map.entries())
      .filter(([ name, route ]) => pattern.test(name) && route.path.indexOf(':') === -1)
      .map(([name, route]) => ({name, route}));
  }

  public static get(name, args?): string {
    let route = NamedRoutes.map.get(name);
    if (args) {
      return route.path.replace(new RegExp(`:(${Object.keys(args).join('|')})`, 'g'), (_, key) => args[ key ]);
    }
    return route.path;
  }

  public static provideRoutes(routes: [[string, Route ]]) {
    return routes.map(([key, route]) => {
      if (NamedRoutes.map.has(key)) {
        throw new Error(`Route named ${key} already exists and points to ${NamedRoutes.map.get(key).path}`);
      }
      NamedRoutes.map.set(key, route);
      return route;
    });
  }

  public get(name, args?) {
    return NamedRoutes.get(name, args);
  }

  public getAll(name) {
    return NamedRoutes.getAll(name);
  }
}

window['NamedRoutes'] = NamedRoutes;
