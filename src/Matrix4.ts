export class Matrix4 {
    protected v: Float64Array
    constructor(v?: Iterable<number>) {
        let _v = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ] || v;
        this.v = new Float64Array(_v);
    }

    clone(): Matrix4 {
        let r = new Matrix4();
        r.v = new Float64Array(this.v);
        return r
    }

    add(rhs: Matrix4) {
        let n = this.clone();
        for (let i = 0; i < 16; i++) {
            n.v[i] += rhs.v[i]
        }
        return n
    }

    mul_scalar(scalar: number) {
        let res = this.clone();
        for (let i = 0; i < 16; i++) {
            res.v[i] *= scalar
        }
        return res
    }

    transpose(): Matrix4 {
        let new_r = new Matrix4();
        new_r.v = new Float64Array([
            this.v[0], this.v[4], this.v[8], this.v[12],
            this.v[1], this.v[5], this.v[9], this.v[13],
            this.v[2], this.v[6], this.v[10], this.v[14],
            this.v[3], this.v[7], this.v[11], this.v[15]
        ])
        return new_r
    }
}