import { Mock } from '~/components/request';
import { getRandom } from '~/misc/random';

Mock.onGet(/api\/v1\/board\/overview[?.*]?/).reply(() =>
    [200, {
        "code": 200,
        "errno": 0,
        "message": null,
        "data": {
            "state1": 0,
            "state2": 0,
            "securitySystemState": 0,
            "bill": 0,
            "loadPower1": 0,
            "loadPower2": 0,
            "totalChargingElectricity": 0,
            "totalDischargingElectricity": 0,
            "chargingElectricity1": 0,
            "dischargingElectricity1": 0,
            "chargingElectricity2": 0,
            "dischargingElectricity2": 0,
            "electricityData1": {
                "xLabels": ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '23:00'],
                "data": [getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220)]
            },
            "electricityData2": {
                "xLabels": ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '23:00'],
                "data": [getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220)]
            }
        },
        "newToken": null
    }]
);

Mock.onGet(/api\/v1\/board\/pcs[?.*]?/).reply(() =>
    [200, {
        "code": 200,
        "errno": 0,
        "message": null,
        "data": {
            "state1": 0,
            "state2": 0,
            "chargingElectricity1": 0,
            "dischargingElectricity1": 0,
            "chargingElectricity2": 0,
            "dischargingElectricity2": 0,
            "electricity1": 0,
            "electricity2": 0,
            "voltage11": 0,
            "current1": 0,
            "voltage12": 0,
            "voltage21": 0,
            "current2": 0,
            "voltage22": 0,
            "gridState1": 0,
            "gridState2": 0,
            "chargingElectricityData1": {
                "xLabels": ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '23:00'],
                "data": [getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220)]
            },
            "dischargingElectricityData1": {
                "xLabels": ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '23:00'],
                "data": [getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220)]
            },
            "chargingElectricityData2": {
                "xLabels": ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '23:00'],
                "data": [getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220)]
            },
            "dischargingElectricityData2": {
                "xLabels": ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '23:00'],
                "data": [getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220)]
            },
            "electricityData1": {
                "xLabels": ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '23:00'],
                "data": [getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220)]
            },
            "electricityData2": {
                "xLabels": ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '23:00'],
                "data": [getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220)]
            }
        },
        "newToken": null
    }]
);

Mock.onGet(/api\/v1\/board\/load[?.*]?/).reply(() =>
    [200, {
        code: 200,
        data: {
            power1: getRandom(0, 200),
            power1Data: {
                xLabels: ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '23:00'],
                data: [getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220)]
            },
            power2: getRandom(0, 200),
            power2Data: {
                xLabels: ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '23:00'],
                data: [getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220)]
            }
        }
    }]
);

Mock.onGet(/api\/v1\/board\/transformer[?.*]?/).reply(() =>
    [200, {
        "code": 200,
        "errno": 0,
        "message": null,
        "data": {
            "temperature1": 0,
            "temperature2": 0,
            "fan1": 0,
            "fan2": 0,
            "state": 0,
            "switch1": 0,
            "switch2": 0,
            "electricity1": 0,
            "electricity2": 0,
            "electricityData1": {
                xLabels: ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '23:00'],
                data: [getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220)]
            },
            "electricityData2": {
                xLabels: ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '23:00'],
                data: [getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220), getRandom(0, 220)]
            }
        },
        "newToken": null
    }]
);

Mock.onGet(/api\/v1\/board\/bms[?.*]?/).reply(() =>
    [200, {
        "code": 200,
        "errno": 0,
        "message": null,
        "data": {
            "soc1": 0,
            "electricity1": 0,
            "voltage1": 0,
            "soc2": 0,
            "electricity2": 0,
            "voltage2": 0            
        },
        "newToken": null
    }]
);
