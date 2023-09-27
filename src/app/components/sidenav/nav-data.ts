export const navbarData = [
  {
    routeLink: 'tramites',
    icon: 'fa-regular fa-clipboard',
    label: 'Trámites',
    permiso: ['administrador', 'usuario'],
  },
  {
    routeLink: 'creacion-tramites',
    icon: 'fa-solid fa-plus',
    label: 'Crear trámite',
    permiso: ['administrador'],
  },
  {
    routeLink: 'reporteria',
    icon: 'fa-solid fa-chart-column',
    label: 'Reporteria',
    permiso: ['administrador', 'usuario'],
  },
  {
    routeLink: 'mantenimiento',
    icon: 'fa-solid fa-broom',
    label: 'Mantenimiento',
    permiso: ['administrador', 'usuario'],
  },
  {
    routeLink: 'gestionUsuarios',
    icon: 'fa-solid fa-users',
    label: 'Gestión de Usuarios',
    permiso: ['administrador'],
  },
  {
    routeLink: 'configuracion-usuario',
    icon: 'fa-solid fa-screwdriver-wrench',
    label: 'Configuración de usuario',
    permiso: ['administrador', 'usuario'],
  },
];
