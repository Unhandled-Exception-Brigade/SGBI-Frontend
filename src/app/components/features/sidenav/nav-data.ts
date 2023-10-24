export const navbarData = [
  {
    routeLink: 'tramites',
    icon: 'fas fa-clipboard',
    label: 'Trámites',
    permiso: ['Administrador', 'Usuario', 'Jefe'],
    subEnlaces: [],
  },
  {
    routeLink: 'creacion-tramites',
    icon: 'fas fa-plus',
    label: 'Crear trámite',
    permiso: ['Administrador', 'Jefe'],
    subEnlaces: [],
  },
  {
    routeLink: 'reporteria',
    icon: 'fas fa-chart-bar',
    label: 'Reportería',
    permiso: ['Administrador', 'Usuario', 'Jefe'],
    subEnlaces: [],
  },
  {
    routeLink: 'mantenimiento',
    icon: 'fas fa-toolbox',
    label: 'Mantenimiento',
    permiso: ['Administrador', 'Jefe'],
    subEnlaces: [
      {
        link: 'monto-exonerar',
        etiqueta: 'Monto a exonerar',
        icon: 'fas fa-dollar-sign fa-2xs',
      },
      {
        link: 'tarifa-servicios-aseo-vias-y-sitios-publicos',
        etiqueta: 'Aseos de vías',
        icon: 'fas fa-road fa-2xs',
      },
      {
        link: 'tarifa-mantenimiento-parques-obras-ornato',
        etiqueta: 'Parques y obras ornato',
        icon: 'fas fa-tree fa-2xs',
      },
      {
        link: 'tarifa-servicio-recoleccion-basura',
        etiqueta: 'Recolección de basura',
        icon: 'fas fa-trash fa-2xs',
      },
    ],
  },
  {
    routeLink: 'gestionUsuarios',
    icon: 'fas fa-user',
    label: 'Gestión de usuarios',
    permiso: ['Administrador'],
    subEnlaces: [],
  },
  {
    routeLink: 'bitacora',
    icon: 'fas fa-book-open',
    label: 'Bitácora',
    permiso: ['Administrador'],
    subEnlaces: [],
  },
];
