export declare class Matrix4 {
    protected v: Float64Array;
    constructor(v?: Iterable<number>);
    clone(): Matrix4;
    add(rhs: Matrix4): Matrix4;
    mul_scalar(scalar: number): Matrix4;
    transpose(): Matrix4;
}
