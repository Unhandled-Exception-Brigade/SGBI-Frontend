export const navbarData = [
  {
    routeLink: 'tramites',
    icon: 'fas fa-clipboard',
    label: 'Trámites',
    permiso: ['administrador', 'usuario', 'jefe'],
  },
  {
    routeLink: 'creacion-tramites',
    icon: 'fas fa-plus',
    label: 'Crear trámite',
    permiso: ['administrador', 'jefe'],
  },
  {
    routeLink: 'reporteria',
    icon: 'fas fa-chart-bar',
    label: 'Reporteria',
    permiso: ['administrador', 'usuario', 'jefe'],
  },
  {
    routeLink: 'mantenimiento',
    icon: 'fas fa-toolbox',
    label: 'Mantenimiento',
    permiso: ['administrador', 'jefe'],
  },
  {
    routeLink: 'gestionUsuarios',
    icon: 'fas fa-user',
    label: 'Gestión de usuarios',
    permiso: ['administrador'],
  }
];
