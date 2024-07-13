pragma circom 2.0.0;

include "node_modules/circomlib/circuits/mimcsponge.circom";

template Booking() {
    // The World ID
    signal input worldcoinId;
    // The booking ID
    signal input bookingId;
    // The booking date
    signal input bookingDate;
    // The booking hash
    signal output hash;

    component mimc = MiMCSponge(3, 220, 1);

    mimc.ins[0] <== worldcoinId;
    mimc.ins[1] <== bookingId;
    mimc.ins[2] <== bookingDate;
    mimc.k <== 0;

    hash <== mimc.outs[0];
}

component main = Booking();