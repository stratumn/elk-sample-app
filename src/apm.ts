import { init as initApm } from 'elastic-apm-js-base';

const apm = initApm({
  serviceName: 'sample-app',
  serverUrl: 'http://localhost:8200',
  distributedTracingOrigins: ['http://localhost:3001', 'http://localhost:3002']
});

export default apm;
