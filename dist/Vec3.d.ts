export declare class Vec3 {
    protected v: Float64Array;
    protected is_transpose: boolean;
    constructor(v?: Iterable<number>);
    get x(): number;
    get y(): number;
    get z(): number;
    clone(): Vec3;
    transpose(): Vec3;
    norm(): number;
    mul_scalar(scalar: number): Vec3;
    to_UnitVec3_and_scalar(): {
        v: Vec3;
        s: number;
    };
}
export declare class Pose {
}
