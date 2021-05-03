export const DEFAULT_CONFIG = {
    VEHICLE_SELECT_SPAWN: { x: -337.068115234375, y: -136.7076873779297, z: 38.3114013671875 },
    AUDIO_APPLUASE: ['applause1', 'applause2', 'applause3', 'applause4'],
    SPAWN_PROTECTION: 10000,
    MAPS: [
        // Inner City
        {
            vehicles: [
                'visione',
                'prototipo',
                'xa21',
                'tyrus',
                'turismor',
                'tempesta',
                't20',
                'reaper',
                'le7b',
                'osiris',
                'banshee2',
                'pfister811',
            ],
            maxScore: 1,
            atmosphere: {
                hour: 12,
                minute: 0,
                weather: 5,
            },
            spawn: { x: -270.22418212890625, y: -1131.75830078125, z: 22.3883056640625 },
            canisters: [
                { x: -270.22418212890625, y: -1124.75830078125, z: 22.3883056640625 },
                // { x: -339.70550537109375, y: -997.2263793945312, z: 29.6336669921875 },
                // { x: -284.79559326171875, y: -1027.213134765625, z: 29.6336669921875 },
                // { x: -307.015380859375, y: -984.8307495117188, z: 30.3414306640625 },
                // { x: -338.0703125, y: -909.9296875, z: 30.3414306640625 },
                // { x: -287.8417663574219, y: -919.028564453125, z: 30.3414306640625 },
                // { x: -246.07911682128906, y: -943.95166015625, z: 30.4761962890625 },
                // { x: -323.6571350097656, y: -895.3186645507812, z: 30.3245849609375 },
                // { x: -359.28790283203125, y: -953.7494506835938, z: 30.3414306640625 },
                // { x: -199.08131408691406, y: -789.6659545898438, z: 30.088623046875 },
                // { x: -203.6967010498047, y: -801.6131591796875, z: 30.088623046875 },
                // { x: -137.56483459472656, y: -706.4703369140625, z: 34.18310546875 },
                // { x: -64.61538696289062, y: -614.3076782226562, z: 35.5142822265625 },
                // { x: -72.84395599365234, y: -544.1802368164062, z: 39.22119140625 },
                // { x: -15.296703338623047, y: -567.8241577148438, z: 36.9970703125 },
                // { x: 3.085714340209961, y: -614.2944946289062, z: 34.97509765625 },
                // { x: -18.764835357666016, y: -626.4527587890625, z: 34.97509765625 },
                // { x: 22.351648330688477, y: -578.3208618164062, z: 30.880615234375 },
                // { x: 59.380218505859375, y: -574.2857055664062, z: 30.880615234375 },
                // { x: 28.10110092163086, y: -657.4285888671875, z: 30.880615234375 },
                // { x: 364.8395690917969, y: -591.6923217773438, z: 27.94873046875 },
                // { x: 328.958251953125, y: -557.2615356445312, z: 27.999267578125 },
                // { x: 340.73406982421875, y: -561.5076904296875, z: 27.999267578125 },
                // { x: 441.21759033203125, y: -569.7494506835938, z: 27.763427734375 },
                // { x: 449.70989990234375, y: -591.085693359375, z: 27.763427734375 },
                // { x: 468.5274658203125, y: -581.90771484375, z: 27.763427734375 },
                // { x: 404.78240966796875, y: -626.6901245117188, z: 27.763427734375 },
                // { x: 457.1076965332031, y: -728.4923095703125, z: 26.6175537109375 },
                // { x: 456.9098815917969, y: -798.8043823242188, z: 26.6343994140625 },
                // { x: 488.4527587890625, y: -953.5648193359375, z: 26.5164794921875 },
                // { x: 485.28790283203125, y: -1068.4615478515625, z: 28.21826171875 },
                // { x: 429.67913818359375, y: -1068.6197509765625, z: 28.4542236328125 },
                // { x: -44.47911834716797, y: -1113.89013671875, z: 25.6907958984375 },
                // { x: -57.66593551635742, y: -1114.813232421875, z: 25.6907958984375 },
                // { x: -15.019779205322266, y: -1086.936279296875, z: 25.9267578125 },
                // { x: 256.78680419921875, y: -1123.186767578125, z: 28.4710693359375 },
                // { x: 339.75823974609375, y: -1083.243896484375, z: 28.6900634765625 },
                // { x: 346.1670227050781, y: -1112.967041015625, z: 28.6563720703125 },
                // { x: 384.1318664550781, y: -1110.817626953125, z: 28.6563720703125 },
                // { x: 449.9076843261719, y: -1021.9912109375, z: 27.7296142578125 },
                // { x: 431.4593505859375, y: -1021.2131958007812, z: 28.08349609375 },
                // { x: 407.5780334472656, y: -993.2175903320312, z: 28.5216064453125 },
                // { x: 298.27252197265625, y: -691.9384765625, z: 28.5552978515625 },
                // { x: 30.93626594543457, y: -1026.3428955078125, z: 28.7069091796875 },
                // { x: -183.4945068359375, y: -1038.5274658203125, z: 26.3311767578125 },
                // { x: -165.41539001464844, y: -1005.7450561523438, z: 26.3480224609375 },
                // { x: -149.90768432617188, y: -960.1846313476562, z: 26.3648681640625 },
                // { x: -69.77142333984375, y: -968.7033081054688, z: 28.4205322265625 },
                // { x: -12.197799682617188, y: -1023.94287109375, z: 28.235107421875 },
            ],
            goals: [
                { x: 380.953857421875, y: -753.8373413085938, z: 28.5552978515625 },
                { x: 246.06593322753906, y: -880.8527221679688, z: 29.751708984375 },
                { x: 222.55384826660156, y: -871.4637451171875, z: 29.751708984375 },
                { x: 222.1582489013672, y: -899.2351684570312, z: 29.953857421875 },
                { x: 199.43736267089844, y: -936.8703002929688, z: 29.93701171875 },
                { x: 168.06593322753906, y: -980.03076171875, z: 29.3472900390625 },
                { x: 155.74945068359375, y: -1076.967041015625, z: 28.4542236328125 },
                { x: 119.47252655029297, y: -1062.3165283203125, z: 28.4542236328125 },
                { x: 59.69670486450195, y: -858.1450805664062, z: 29.953857421875 },
                { x: 36.408790588378906, y: -849.9033203125, z: 30.00439453125 },
                { x: 37.9516487121582, y: -887.98681640625, z: 29.4483642578125 },
                { x: 239.94725036621094, y: -773.1692504882812, z: 29.970703125 },
                { x: 257.20880126953125, y: -598.5362548828125, z: 42.2711181640625 },
                { x: 153.4945068359375, y: -566.0703125, z: 43.147216796875 },
                { x: 23.80219841003418, y: -765.6263427734375, z: 43.5010986328125 },
                { x: -97.31867980957031, y: -721.2395629882812, z: 43.4505615234375 },
                { x: 42, y: -745.1604614257812, z: 30.880615234375 },
                { x: 103.9120864868164, y: -794.5318603515625, z: 30.7457275390625 },
                { x: -319.4109802246094, y: -1133.2747802734375, z: 23.97216796875 },
                { x: -340.6022033691406, y: -1085.248291015625, z: 22.2872314453125 },
                { x: -161.6967010498047, y: -881.89453125, z: 28.4542236328125 },
                { x: -78.69889831542969, y: -728.3208618164062, z: 33.5428466796875 },
                { x: 290.9010925292969, y: -797.947265625, z: 28.5721435546875 },
                { x: 364.5626220703125, y: -858.2637329101562, z: 28.6058349609375 },
                { x: 232.4703369140625, y: -956.7692260742188, z: 28.5721435546875 },
            ],
        },
        // Coastal
        {
            vehicles: [
                'surano',
                'specter2',
                'seven70',
                'ruston',
                'rapidgt',
                'omnis',
                'massacro',
                'lynx',
                'kuruma',
                'jester',
                'furoregt',
                'elegy2',
                'carbonizzare',
                'banshee',
            ],
            maxScore: 10,
            atmosphere: {
                hour: 12,
                minute: 0,
                weather: 5,
            },
            spawn: { x: -1683.82421875, y: -879.8505249023438, z: 8 },
            canisters: [
                { x: -1578.830810546875, y: -1160.2945556640625, z: 1.6292724609375 },
                { x: -1510.4439697265625, y: -1105.239501953125, z: 1.848388671875 },
                { x: -1427.4989013671875, y: -962.3604125976562, z: 6.5999755859375 },
                { x: -1457.4329833984375, y: -927.4813232421875, z: 9.4307861328125 },
                { x: -1525.226318359375, y: -877.1472778320312, z: 9.4476318359375 },
                { x: -1345.147216796875, y: -903.91650390625, z: 12.783935546875 },
                { x: -1320.2109375, y: -924.8571166992188, z: 10.5428466796875 },
                { x: -1179.177978515625, y: -818.3208618164062, z: 13.6768798828125 },
                { x: -1264.7471923828125, y: -751.094482421875, z: 20.248291015625 },
                { x: -1276.7340087890625, y: -714.2109985351562, z: 22.5399169921875 },
                { x: -1299.82421875, y: -647.9208984375, z: 25.876220703125 },
                { x: -1359.82421875, y: -593.2219848632812, z: 28.6900634765625 },
                { x: -1440.4483642578125, y: -457.76702880859375, z: 34.4022216796875 },
                { x: -1632.2769775390625, y: -433.9252624511719, z: 38.5977783203125 },
                { x: -1678.7208251953125, y: -419.8681335449219, z: 42.945068359375 },
                { x: -1697.2615966796875, y: -442.997802734375, z: 40.6197509765625 },
                { x: -1690.6021728515625, y: -389.19561767578125, z: 46.955322265625 },
                { x: -1995.2572021484375, y: -151.64834594726562, z: 29.4483642578125 },
                { x: -2197.160400390625, y: -374.4791259765625, z: 12.5985107421875 },
                { x: -2190.738525390625, y: -418.28570556640625, z: 12.4468994140625 },
                { x: -1585.239501953125, y: -753.6264038085938, z: 20.3831787109375 },
                { x: -1550.5714111328125, y: -778.6813354492188, z: 18.4791259765625 },
                { x: -1467.257080078125, y: -655.96484375, z: 28.841796875 },
                { x: -1989.6263427734375, y: -303.019775390625, z: 43.4505615234375 },
                { x: -1995.78466796875, y: -319.23956298828125, z: 47.4439697265625 },
                { x: -1368.5406494140625, y: -979.107666015625, z: 7.846923828125 },
            ],
            goals: [
                { x: -1284.5010986328125, y: -811.8461303710938, z: 16.6593017578125 },
                { x: -1306.892333984375, y: -785.8285522460938, z: 17.2996826171875 },
                { x: -1330.3648681640625, y: -756.4615478515625, z: 19.7091064453125 },
                { x: -1501.6219482421875, y: -530.6637573242188, z: 32.1611328125 },
                { x: -1531.3582763671875, y: -570.2769165039062, z: 32.868896484375 },
                { x: -2012.7427978515625, y: -482.70330810546875, z: 10.7281494140625 },
                { x: -2045.4725341796875, y: -451.3582458496094, z: 10.77880859375 },
                { x: -1979.77587890625, y: -599.076904296875, z: 8.6387939453125 },
                { x: -1903.160400390625, y: -651.9560546875, z: 9.4981689453125 },
                { x: -1881.3363037109375, y: -738.2241821289062, z: 6.161865234375 },
                { x: -1843.199951171875, y: -801.2835083007812, z: 5.4205322265625 },
                { x: -1764.5933837890625, y: -797.8021850585938, z: 8.116455078125 },
                { x: -1725.4945068359375, y: -727.5296630859375, z: 9.6329345703125 },
                { x: -1618.140625, y: -735.7450561523438, z: 10.5260009765625 },
                { x: -1669.96484375, y: -652.8263549804688, z: 14.5699462890625 },
                { x: -1592.4263916015625, y: -702.7780151367188, z: 18.00732421875 },
                { x: -1486.04833984375, y: -849.6131591796875, z: 13.744384765625 },
                { x: -1434.19775390625, y: -756.0263671875, z: 22.893798828125 },
                { x: -1671.019775390625, y: -604.7604370117188, z: 33.003662109375 },
                { x: -1624.20654296875, y: -553.107666015625, z: 33.5428466796875 },
                { x: -1796.2813720703125, y: -450.1318664550781, z: 41.5970458984375 },
                { x: -1869.5736083984375, y: -428.4659423828125, z: 45.4388427734375 },
                { x: -2041.87255859375, y: -270.6725158691406, z: 22.7252197265625 },
                { x: -2094.909912109375, y: -303.74505615234375, z: 12.3626708984375 },
                { x: -2062.1142578125, y: -358.70770263671875, z: 11.6885986328125 },
                { x: -1923.4681396484375, y: -461.5912170410156, z: 20.13037109375 },
                { x: -1811.7098388671875, y: -529.9912109375, z: 30.13916015625 },
                { x: -1718.6241455078125, y: -1010.4000244140625, z: 4.81396484375 },
                { x: -1834.04833984375, y: -874.5758056640625, z: 2.3875732421875 },
                { x: -1933.054931640625, y: -753.4945068359375, z: 2.3033447265625 },
                { x: -2047.7274169921875, y: -608.1890258789062, z: 2.3875732421875 },
                { x: -2118.01318359375, y: -497.74945068359375, z: 2.5391845703125 },
                { x: -2059.094482421875, y: -443.037353515625, z: 10.829345703125 },
            ],
        },
    ],
};
