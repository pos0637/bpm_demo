import { Mock } from '~/components/request';
import { getRandom } from '~/misc/random';

Mock.onGet(/api\/v1\/board\/overview[?.*]?/).reply(() =>
    [200, {
        code: 200,
        data: {
            runningInformation: getRandom(0, 1)
        }
    }]
);

Mock.onGet(/api\/v1\/board\/main[?.*]?/).reply(() =>
    [200, {
        code: 200,
        data: {
            chargingElectricity: getRandom(0, 220)
        }
    }]
);
