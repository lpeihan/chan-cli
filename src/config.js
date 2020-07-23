module.exports = {
  templates: {
    mobile: {
      description: 'a mobile template which is base on vue-cli3, vant, etc.',
      url: 'direct:git@git.ajin.me:f2e/tpl-mobile.git'
    },
    pc: {
      description: 'a pc template which is base on vue-cli3, ant-design-vue, etc.',
      url: 'direct:git@git.ajin.me:f2e/tpl-pc.git'
    }
  },
  mapActions: {
    create: {
      description: 'create a new project.',
      examples: [
        'chan-cli create <project-name>'
      ]
    },
    list: {
      description: 'view all project templates.',
      examples: [
        'chan-cli list'
      ]
    },
    '*': {
      description: 'command not found',
      examples: []
    }
  }
};
