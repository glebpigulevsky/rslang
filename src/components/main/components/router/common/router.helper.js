export const getLocationPath = () => window.location.hash.slice(1).toLowerCase() || '/';
export const isRouteHasPath = (route, currentPath) => route.path.match(new RegExp(`^\\${currentPath}$`, 'gm'));
