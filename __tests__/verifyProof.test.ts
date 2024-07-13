import { verifyProof } from '@/src/lib/zkProof';
import { GeneratedProofResponse } from '@/src/app/models/zk-proof-models';
import * as fs from 'fs/promises';
import * as snarkjs from 'snarkjs';

jest.mock('fs/promises');
jest.mock('snarkjs');

describe('verifyProof', () => {
    it('should return error for an invalid proof', async () => {
        const invalidProofDetails: GeneratedProofResponse = {
            proof: {
                pi_a: [
                    "10384964260455187225095372348513671246021790280346562948830886706419110565897",
                    "102884293898421712516863680837373636362436353535221681130855724250018496",
                    "1"
                ],
                pi_b: [
                    [
                        "18317634215200310590484371412217933518011607784874421778899054970407513632056",
                        "1821294982144107880548395943001000000049790948088431213005840440108"
                    ],
                    [
                        "737612075415212021024684406010407287276927012255033992959582845123783325647",
                        "2034668546120951762359131822441636372829129292925976071052291892928266845123"
                    ],
                    [
                        "1",
                        "0"
                    ]
                ],
                pi_c: [
                    "6709777788411390700534644185104620771046167024714178204815685780259231807336",
                    "18804810501633552546484172778152032472627637953236680728614786920565582735802",
                    "1"
                ],
                curve: "bn128",
                protocol: "groth16",
            },
            publicSignals: ["0x1", "0x1"]
        };

        const verificationKey = { /* mock verification key */ };

        (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(verificationKey));
        (snarkjs.groth16.verify as jest.Mock).mockResolvedValue(false);

        const result = await verifyProof(invalidProofDetails);

        expect(result.status).toBe('error');
        expect(result.message).toBe('Invalid proof');
    });

    it('should return success for a valid proof', async () => {
        const validProofDetails: GeneratedProofResponse = {
            proof: {
                pi_a: [
                    "10384964260455187225095372348513671246021790280346562948830886706419110565897",
                    "1028842938984217125168636808983338397154906370840640221681130855724250018496",
                    "1"
                ],
                pi_b: [
                    [
                        "18317634215200310590484371412217933518011607784874421778899054970407513632056",
                        "18212949821441078805480656389421558643999931104849790948088431213005840440108"
                    ],
                    [
                        "737612075415212021024684406010407287276927012255033992959582845123783325647",
                        "20346685461209517623591318224416926508914031625115976071052291892928266845123"
                    ],
                    [
                        "1",
                        "0"
                    ]
                ],
                pi_c: [
                    "6709777788411390700534644185104620771046167024714178204815685780259231807336",
                    "18804810501633552546484172778152032472627637953236680728614786920565582735802",
                    "1"
                ],
                curve: "bn128",
                protocol: "groth16",
            },
            publicSignals: [
                "8167471577207317140600366119091595629155906135737879192690660053837496916393"
            ]
        };

        const verificationKey = { /* mock verification key */ };

        (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(verificationKey));
        (snarkjs.groth16.verify as jest.Mock).mockResolvedValue(true);

        const result = await verifyProof(validProofDetails);

        expect(result.status).toBe('success');
        expect(result.message).toBe('Proof verified successfully');
    });
});
