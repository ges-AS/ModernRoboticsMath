export class Vec3 {
    protected v: Float64Array
    protected is_transpose: boolean = false
    constructor(v?: Iterable<number>) {
        let _v = [0, 0, 0] || v;
        this.v = new Float64Array(_v);
    }
    get x() { return this.v[0] }
    get y() { return this.v[1] }
    get z() { return this.v[2] }
    clone() {
        return new Vec3(this.v);
    }
    transpose() {
        let n = this.clone();
        n.is_transpose = true;
        return n;
    }
    norm() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    mul_scalar(scalar: number) {
        let n = this.clone()
        n.v[0] = n.v[0] * scalar;
        n.v[1] = n.v[1] * scalar;
        n.v[2] = n.v[2] * scalar;
        return n
    }
    to_UnitVec3_and_scalar(): { v: Vec3, s: number } {
        let s = this.norm();
        let v = this.clone().mul_scalar(1 / s);
        return {
            v, s
        }
    }
}



export class Pose { }