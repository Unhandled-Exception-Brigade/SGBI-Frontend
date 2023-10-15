export const navbarData = [
  {
    routeLink: 'tramites',
    icon: 'fas fa-clipboard',
    label: 'Trámites',
    permiso: ['administrador', 'usuario', 'jefe'],
    subEnlaces: []
  },
  {
    routeLink: 'creacion-tramites',
    icon: 'fas fa-plus',
    label: 'Crear trámite',
    permiso: ['administrador', 'jefe'],
    subEnlaces: []
  },
  {
    routeLink: 'reporteria',
    icon: 'fas fa-chart-bar',
    label: 'Reportería',
    permiso: ['administrador', 'usuario', 'jefe'],
    subEnlaces: []
  },
  {
    routeLink: 'mantenimiento',
    icon: 'fas fa-toolbox',
    label: 'Mantenimiento',
    permiso: ['administrador', 'jefe'],
    subEnlaces: [
      /*
      {
        link: 'monto-exonerar',
        etiqueta: 'Monto a exonerar'
      },
      {
        link: 'tarifa-servicios-aseo-vias-y-sitios-publicos',
        etiqueta: 'Aseos de vias y sitios publicos'
      },
      {
        link: 'tarifa-mantenimiento-parques-obras-ornato',
        etiqueta: 'Tarifa parques y obras ornato'
      },{
        link: 'tarifa-servicio-recoleccion-basura',
        etiqueta: 'Tarifa serivicio recoleccion basura'
      }
      */
    ]
  },
  {
    routeLink: 'gestionUsuarios',
    icon: 'fas fa-user',
    label: 'Gestión de usuarios',
    permiso: ['administrador'],
    subEnlaces: []
  }
];
