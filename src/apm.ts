import { init as initApm } from 'elastic-apm-js-base';

const apm = initApm({
  serviceName: 'sample-app',
  serverUrl: 'http://apm-server:8200'
});

export default apm;
