import { Vec3 } from "./Vec3";
export declare class Matrix3 {
    protected v: Float64Array;
    constructor(v?: Iterable<number>);
    show(): void;
    clone(): Matrix3;
    add(rhs: Matrix3): Matrix3;
    mul_M3(rhs: Matrix3): Matrix3;
    mul_scalar(scalar: number): Matrix3;
    mul_V3(rhs: Vec3): Vec3;
    transpose(): Matrix3;
}
export declare class so3 extends Matrix3 {
    constructor();
    fromVec3(v: Vec3): this;
    mul_R3(rhs: Rotation3): Matrix3;
}
export declare class Rotation3 extends Matrix3 {
    constructor();
    clone(): Rotation3;
    transpose(): Rotation3;
    inv(): Rotation3;
    mul_R3(rhs: Rotation3): Rotation3;
    exp(axis: Vec3, angle: number): Matrix3;
    determinant(): number;
}
