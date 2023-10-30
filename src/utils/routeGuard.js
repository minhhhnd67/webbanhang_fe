export function routeGuard(to, from, next) {
    if (!to.matched) {
      // Vue Router chưa được khởi tạo
      next(false);
      return;
    }
  
    // Vue Router đã được khởi tạo
    next();
  }
  