import historyRoutes from '@/views/history/routes';
import homeRoutes from '@/views/home/routes';
import errorsRoutes from '@/views/errors/routes';

export const createRoutes = () => [
  ...historyRoutes,
  ...homeRoutes,

  // mast be last
  ...errorsRoutes,
];
