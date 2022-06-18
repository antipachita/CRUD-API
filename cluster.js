import cluster from 'cluster';
import os from 'os';

if (cluster.isPrimary) {
    const cpusCount = os.cpus().length;
    console.log(`Cpus: ${cpusCount}`)
    for (let i = 0; i<cpusCount; i++) {
        cluster.fork();
    }
}

if (cluster.isWorker) {
    import('./server.js')
}