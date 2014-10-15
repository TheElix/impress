module.exports = {

  config: {
    cloud:   '{cloud}',
    cluster: '{cluster}',
    log:     '{log}',
    plugins: 'array',
    sandbox: '{sandbox}',
    servers: '{servers}'
  },

  cloud: {
    name:       'string',
    type:       '(none,standalone)',
    controller: 'string',
    pubSubPort: '3000:number',
    reqResPort: '3001:number',
    health:     '5s:duration'
  },

  cluster: {
    check:      '[string]',
    name:       'string',
    cookie:     'node:string',
    strategy:   '(single,specialization,multiple,sticky)',
    workers:    '1:number',
    nagle:      'false:boolean',
    gcInterval: '10m:duration'
  },

  log: {
    keepDays:       '100:number',
    writeInterval:  '5s:duration',
    writeBuffer:    '64kb:size',
    applicationLog: 'false:boolean',
    serverLog:      'true:boolean'
  },

  sandbox: {
    global: '[array]',
    api:    '[array]'
  },

  servers: {
    _other:   '{{server}}'
  },

  server: {
    protocol: '(http,https)',
    address:  'string',
    port:     'number',
    nagle:    'false:boolean',
    slowTime: '4s:duration',
    key:      '[string]',
    cert:     '[string]'
  }

};