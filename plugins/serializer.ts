import JSONAPISerializer from 'json-api-serializer'
export default defineNuxtPlugin(() => {
  const Serializer = new JSONAPISerializer()
  Serializer.register('skills', {
    id: 'id',
    relationships: {
      skillType: {
        type: 'skill-types',
      },
      skillLevel: {
        type: 'skill-levels',
      },
      source: {
        type: 'sources',
      },
      occupations: {
        type: 'occupations',
      },
      clusters: {
        type: 'clusters',
      },
      programs: {
        type: 'programs',
      },
    },
  })
  Serializer.register('programs', {
    id: 'id',
    relationships: {
      skills: {
        type: 'skills',
      },
    },
  })
  Serializer.register('skill-types', {
    id: 'id',
  })
  Serializer.register('skill-levels', {
    id: 'id',
  })
  Serializer.register('sources', {
    id: 'id',
  })
  Serializer.register('clusters', {
    id: 'id',
  })
  Serializer.register('occupations', {
    id: 'id',
    relationships: {
      sector: {
        type: 'sectors',
      },
    },
  })
  Serializer.register('sectors', {
    id: 'id',
    relationships: {
      parent: {
        type: 'sectors',
      },
      subsectors: {
        type: 'sectors',
      },
    },
  })
  return {
    provide: {
      jsonSerializer: Serializer,
    },
  }
})
