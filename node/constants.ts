export const SORT_OPTIONS = [
  {
    value: 'OrderByScoreDESC',
    label: 'store/ordenation.relevance',
  },
  {
    value: 'OrderByTopSaleDESC',
    label: 'store/ordenation.sales',
  },
  {
    value: 'OrderByReleaseDateDESC',
    label: 'store/ordenation.release.date',
  },
  {
    value: 'OrderByBestDiscountDESC',
    label: 'store/ordenation.discount',
  },
  {
    value: 'OrderByPriceDESC',
    label: 'store/ordenation.price.descending',
  },
  {
    value: 'OrderByPriceASC',
    label: 'store/ordenation.price.ascending',
  },
  {
    value: 'OrderByNameASC',
    label: 'store/ordenation.name.ascending',
  },
  {
    value: 'OrderByNameDESC',
    label: 'store/ordenation.name.descending',
  },
]
export interface Structure {
  name: string
  props: any
}
export const BUILDER_STRUCTURE: Array<Structure> = [
  {
    name: 'Placa Base',
    props: {
      baseQueryKey: `componentes-de-ordenador/placas-base/amd/intel`,
      baseQueryMap: `category-1,category-2,fabricante-de-procesador,fabricante-de-procesador`,
      baseFacets: [
        { key: 'category-1', value: 'componentes-de-ordenador' },
        { key: 'category-2', value: 'placas-base' },
        { key: 'fabricante-de-procesador', value: 'amd' },
        { key: 'fabricante-de-procesador', value: 'intel' },
      ],
    },
  },
  {
    name: 'Procesador',
    props: {
      baseQueryKey: `componentes-de-ordenador/procesadores`,
      baseQueryMap: `category-1,category-2`,
      baseFacets: [
        { key: 'category-1', value: 'componentes-de-ordenador' },
        { key: 'category-2', value: 'procesadores' },
      ],
    },
  },
  {
    name: 'Chasis',
    props: {
      baseQueryKey: `componentes-de-ordenador/cajas-de-pc`,
      baseQueryMap: `category-1,category-2`,
      baseFacets: [
        { key: 'category-1', value: 'componentes-de-ordenador' },
        { key: 'category-2', value: 'cajas-de-pc' },
      ],
    },
  },
  {
    name: 'RAM',
    props: {
      baseQueryKey: `componentes-de-ordenador/memoria-ram`,
      baseQueryMap: `category-1,category-2`,
      baseFacets: [
        { key: 'category-1', value: 'componentes-de-ordenador' },
        { key: 'category-2', value: 'memoria-ram' },
      ],
    },
  },
  {
    name: 'Disco Duro',
    props: {
      baseQueryKey: `componentes-de-ordenador/discos-duros`,
      baseQueryMap: `category-1,category-2`,
      baseFacets: [
        { key: 'category-1', value: 'componentes-de-ordenador' },
        { key: 'category-2', value: 'discos-duros' },
      ],
    },
  },
  {
    name: 'Tarjeta Gráfica',
    props: {
      baseQueryKey: `componentes-de-ordenador/tarjetas-graficas`,
      baseQueryMap: `category-1,category-2`,
      baseFacets: [
        { key: 'category-1', value: 'componentes-de-ordenador' },
        { key: 'category-2', value: 'tarjetas-graficas' },
      ],
    },
  },
  {
    name: 'Fuente de alimentación',
    props: {
      baseQueryKey: `componentes-de-ordenador/fuentes-de-alimentacion`,
      baseQueryMap: `category-1,category-2`,
      baseFacets: [
        { key: 'category-1', value: 'componentes-de-ordenador' },
        { key: 'category-2', value: 'fuentes-de-alimentacion' },
      ],
    },
  },
  {
    name: 'Sistemas Operativos',
    props: {
      baseQueryKey: `componentes-de-ordenador/sistemas-operativos`,
      baseQueryMap: `category-1,category-2`,
      baseFacets: [
        { key: 'category-1', value: 'componentes-de-ordenador' },
        { key: 'category-2', value: 'sistemas-operativos' },
      ],
    },
  },
]
export const DATA_BASES = [
  {
    value: 'builder_chasis',
    label: 'Tabla Chasis',
    properties: {
      reffab: {
        title: 'Referencia',
        type: 'string',
      },
      ValorPlaca: {
        title: 'Placa Compatible',
        type: 'string',
      },
      ValorTarjeta: {
        title: 'GPU Compatible',
        type: 'string',
      },
      ValorFuente: {
        title: 'Fuente Compatible',
        type: 'string',
      },
    },
  },
  {
    value: 'builder_cpu',
    label: 'Tabla CPUs',
    properties: {
      reffab: {
        title: 'Referencia',
        type: 'string',
      },
      ValorPlaca: {
        title: 'Placa Compatible',
        type: 'string',
      },
      ValorRefrig: {
        title: 'Refrigeración Compatible',
        type: 'string',
      },
      ValorFuente: {
        title: 'Fuente Compatible',
        type: 'string',
      },
    },
  },
  {
    value: 'builder_refrig',
    label: 'Tabla Refrigeradores',
    properties: {
      reffab: {
        title: 'Referencia',
        type: 'string',
      },
      ValorCPU: {
        title: 'CPU Compatible',
        type: 'string',
      },
    },
  },
  {
    value: 'builder_ram',
    label: 'Tabla RAMs',
    properties: {
      reffab: {
        title: 'Referencia',
        type: 'string',
      },
      ValorPlaca: {
        title: 'Placa Compatible',
        type: 'string',
      },
    },
  },
  {
    value: 'builder_placa',
    label: 'Tabla Placas',
    properties: {
      reffab: {
        title: 'Referencia',
        type: 'string',
      },
      ValorCPU: {
        title: 'CPU Compatible',
        type: 'string',
      },
      ValorChasis: {
        title: 'Chasis Compatible',
        type: 'string',
      },
      ValorRAM: {
        title: 'RAM Compatible',
        type: 'string',
      },
      ValorTarjeta: {
        title: 'GPU Compatible',
        type: 'string',
      },
      ValorDisco: {
        title: 'Disco Compatible',
        type: 'string',
      },
    },
  },
  {
    value: 'builder_gpu',
    label: 'Tabla Tarjetas',
    properties: {
      reffab: {
        title: 'Referencia',
        type: 'string',
      },
      ValorPlaca: {
        title: 'CPU Compatible',
        type: 'string',
      },
      ValorChasis: {
        title: 'Chasis Compatible',
        type: 'string',
      },
      ValorFuente: {
        title: 'Fuente Compatible',
        type: 'string',
      },
    },
  },
  {
    value: 'builder_fuente',
    label: 'Tabla Fuentes',
    properties: {
      reffab: {
        title: 'Referencia',
        type: 'string',
      },
      ValorChasis: {
        title: 'Chasis Compatible',
        type: 'string',
      },
      ValorTarjeta: {
        title: 'GPU Compatible',
        type: 'string',
      },
    },
  },
  {
    value: 'builder_disco',
    label: 'Tabla Discos',
    collection: {
      pcbox: '1001',
      beep: '1001',
    },
    properties: {
      reffab: {
        title: 'Referencia',
        width: 240,
        type: 'string',
      },
      ValorPlaca: {
        title: 'Placa Compatible',
        type: 'string',
      },
    },
  },
]
