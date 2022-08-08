import { Vec3 } from "./Vec3";

export class Matrix3 {
    protected v: Float64Array;
    constructor(v?: Iterable<number>) {
        let _v = [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
        ] || v;
        this.v = new Float64Array(_v);
    }

    show() {
        let show_string = `
            ${this.v[0].toFixed(2)}  ${this.v[1].toFixed(2)}  ${this.v[2].toFixed(2)}
            ${this.v[3].toFixed(2)}  ${this.v[4].toFixed(2)}  ${this.v[5].toFixed(2)}
            ${this.v[6].toFixed(2)}  ${this.v[7].toFixed(2)}  ${this.v[8].toFixed(2)}
        `;
        console.log(show_string);
    }

    clone(): Matrix3 {
        let r = new Matrix3();
        r.v = new Float64Array(this.v);
        return r
    }

    add(rhs: Matrix3) {
        let n = this.clone();
        for (let i = 0; i < 9; i++) {
            n.v[i] += rhs.v[i]
        }
        return n
    }

    mul_M3(rhs: Matrix3) {
        const a00 = this.v[0];
        const a01 = this.v[1];
        const a02 = this.v[2];
        const a10 = this.v[3];
        const a11 = this.v[4];
        const a12 = this.v[5];
        const a20 = this.v[6];
        const a21 = this.v[7];
        const a22 = this.v[8];

        const b00 = rhs.v[0];
        const b01 = rhs.v[1];
        const b02 = rhs.v[2];
        const b10 = rhs.v[3];
        const b11 = rhs.v[4];
        const b12 = rhs.v[5];
        const b20 = rhs.v[6];
        const b21 = rhs.v[7];
        const b22 = rhs.v[8];

        let n = new Matrix3();
        n.v[0] = b00 * a00 + b01 * a10 + b02 * a20
        n.v[1] = b00 * a01 + b01 * a11 + b02 * a21
        n.v[2] = b00 * a02 + b01 * a12 + b02 * a22
        n.v[3] = b10 * a00 + b11 * a10 + b12 * a20
        n.v[4] = b10 * a01 + b11 * a11 + b12 * a21
        n.v[5] = b10 * a02 + b11 * a12 + b12 * a22
        n.v[6] = b20 * a00 + b21 * a10 + b22 * a20
        n.v[7] = b20 * a01 + b21 * a11 + b22 * a21
        n.v[8] = b20 * a02 + b21 * a12 + b22 * a22

        return n;
    }

    mul_scalar(scalar: number) {
        let res = this.clone();
        for (let i = 0; i < 9; i++) {
            res.v[i] *= scalar
        }
        return res
    }


    mul_V3(rhs: Vec3): Vec3 {
        const x = rhs.x
        const y = rhs.y
        const z = rhs.z

        return new Vec3([
            x * this.v[0] + y * this.v[3] + z * this.v[6],
            x * this.v[1] + y * this.v[4] + z * this.v[7],
            x * this.v[2] + y * this.v[5] + z * this.v[8],
        ])
    }

    transpose(): Matrix3 {
        let new_r = new Matrix3();
        new_r.v = new Float64Array([
            this.v[0], this.v[3], this.v[6],
            this.v[1], this.v[4], this.v[7],
            this.v[2], this.v[5], this.v[8]
        ])
        return new_r
    }
}

export class so3 extends Matrix3 {
    constructor() {
        super([
            0, 0, 0,
            0, 0, 0,
            0, 0, 0
        ])
    }
    fromVec3(v: Vec3) {
        this.v = new Float64Array([
            0, -v.x, v.y,
            v.z, 0, -v.z,
            -v.y, v.x, 0
        ]);
        return this
    }
    mul_R3(rhs: Rotation3): Matrix3 {
        return this.mul_M3(rhs)
    }
}

// special orthogonal group
export class Rotation3 extends Matrix3 {
    constructor() {
        super([
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
        ])
    }

    clone(): Rotation3 {
        return super.clone() as Rotation3
    }

    transpose(): Rotation3 {
        return super.transpose() as Rotation3;
    }

    inv(): Rotation3 {
        return this.transpose();
    }

    mul_R3(rhs: Rotation3): Rotation3 {
        const a00 = this.v[0];
        const a01 = this.v[1];
        const a02 = this.v[2];
        const a10 = this.v[3];
        const a11 = this.v[4];
        const a12 = this.v[5];
        const a20 = this.v[6];
        const a21 = this.v[7];
        const a22 = this.v[8];

        const b00 = rhs.v[0];
        const b01 = rhs.v[1];
        const b02 = rhs.v[2];
        const b10 = rhs.v[3];
        const b11 = rhs.v[4];
        const b12 = rhs.v[5];
        const b20 = rhs.v[6];
        const b21 = rhs.v[7];
        const b22 = rhs.v[8];

        let n = new Rotation3();
        n.v[0] = b00 * a00 + b01 * a10 + b02 * a20
        n.v[1] = b00 * a01 + b01 * a11 + b02 * a21
        n.v[2] = b00 * a02 + b01 * a12 + b02 * a22
        n.v[3] = b10 * a00 + b11 * a10 + b12 * a20
        n.v[4] = b10 * a01 + b11 * a11 + b12 * a21
        n.v[5] = b10 * a02 + b11 * a12 + b12 * a22
        n.v[6] = b20 * a00 + b21 * a10 + b22 * a20
        n.v[7] = b20 * a01 + b21 * a11 + b22 * a21
        n.v[8] = b20 * a02 + b21 * a12 + b22 * a22

        return n;
    }

    exp(axis: Vec3, angle: number) {
        let s = new so3().fromVec3(axis);
        let result = new Rotation3();
        let p1 = s.mul_scalar(Math.sin(angle))
        let p2 = s.mul_scalar(1 - Math.cos(angle)).mul_M3(s.mul_scalar(1 - Math.cos(angle)))
        return result.add(p1).add(p2);
    }

    determinant() {
        return 1
    }
}