export const navbarData = [
  {
    routeLink: 'tramites',
    icon: 'far fa-clipboard',
    label: 'Trámites',
    permiso: ['administrador', 'usuario'],
  },
  {
    routeLink: 'creacion-tramites',
    icon: 'fas fa-plus',
    label: 'Crear trámite',
    permiso: ['administrador'],
  },
  {
    routeLink: 'reporteria',
    icon: 'fas fa-chart-bar',
    label: 'Reporteria',
    permiso: ['administrador', 'usuario'],
  },
  {
    routeLink: 'mantenimiento',
    icon: 'fas fa-broom',
    label: 'Mantenimiento',
    permiso: ['administrador', 'usuario'],
  },
  {
    routeLink: 'gestionUsuarios',
    icon: 'fas fa-user',
    label: 'Gestión de Usuarios',
    permiso: ['administrador'],
  },
  {
    routeLink: 'configuracion-usuario',
    icon: 'fas fa-screwdriver',
    label: 'Configuración de usuario',
    permiso: ['administrador', 'usuario'],
  },
];
