class Vector2 {
    constructor( x = 0, y = 0) {
        Vector2.prototype.isVector2 = true;

        this.x = x;
        this.y = y;
    }

    // 获取向量的宽度分量（x分量的另个名称)
    get width() {
        return this.x;
    }

    // 设置向量的x分量
    set width( value ) {
        this.x = value;
    }

    // 获取向量的y分量
    get height() {
        return this.y;
    }

    // 设置向量的y分量
    set height( value ) {
        this.y = value;
    }

    // 设置向量的值
    set ( x, y ) {
        this.x = x;
        this.y = y;

        return this;
    }

    // 设置向量的缩放,就是向量的xy分量都是这个值
    setScaler( scalar ) {
        this.x = scalar;
        this.y = scalar;

        return this;
    }

    // 设置x分量
    setX( x ) {
        this.x = x;

        return this;
    } 

    setY( y ) {
        this.y = y;

        return this;
    }

    // 通过指定元素的索引号来给某个分量的值赋值，Vector2只有2个维度，所以只有0和
    // 1两个位置，指定别的则越界
    setComponent( index, value ) {
        switch( index ) {
            case 0: this.x = value; break;
            case 1: this.y = value; break;
            default: throw new Error( 'index is out of range: ' + index);
        }
    }

    // 克隆对象
    clone() {
        return new this.constructor( this.x, this.y );
    }

    // 把指定的Vector2或者包含xy分量的对象复制到Vector2
    copy( v ) {
        this.x = v.x;
        this.y = v.y;

        return this;
    }

    // 向量相加，是把向量的每个分量分别相加
    add( v ) {
        this.x += v.x;
        this.y += v.y;

        return this;
    }

    // 相加某个系数，是把每个分量都加上这个系数
    addScalar( s ) {
        this.x += s;
        this.y += s;

        return this;
    }

    // 两个向量相加
    addVectors( a, b ) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;

        return this;
    }

    // 加上某个向量的几倍数
    addScaledVector( v, s ) {
        this.x += v.x * s;
        this.y += v.y * s;

        return this;
    }

    // 减去某个向量，向量相减是向量的每个分量分别相减
    sub( v ) {
        this.x -= v.x;
        this.y -= v.y;

        return this;
    }

    // 两个向量相减
    subVectors( a, b ) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;

        return this;
    }

    // 乘以某个向量
    multiply ( v ) {
        this.x *= v.x;
        this.y *= v.y;

        return this;
    }

    // 向量的每个分量都放大scalar倍数
    multiplyScalar ( scalar ) {
        this.x *= scalar;
        this.y *= scalar;

        return this;
    }

    // 除以某个向量，就是向量的每个分量分别相除
    divide( v ) {
        this.x /= v.x;
        this.y /= v.y;

        return this;
    }

    // 向量的每个分量缩小scalar,调用multiplyScalar就是
    // 乘以某个数的倒数就是除以这个数
    divideScalar( scalar ) {
        return this.multiplyScalar( 1 / scalar );
    }


    // (暂时未实现)
    applyMatrix3( m ) {
        
    }

    // 与某个向量比较，计算得到二者最小向量，即xy分量最小的向量，比如
    // Vector2(2,1)和Vector2(1,1)得到的最小向量是Vector2(1,1)
    min( v ) {
        this.x = Math.min( this.x, v.x );
        this.y = Math.min( this.y, v.y );

        return this;
    }

    // 与某个向量比较，计算得到二者最大向量，即xy分量最小的向量，比如
    // Vector2(2,1)和Vector2(1,1)得到的最小向量是Vector2(2,1)
    max ( v ) {
        this.x = Math.max( this.x, v.x );
        this.y = Math.max( this.y, v.y );

        return this;
    }

    /**
     * 如果此向量的 x 或 y 值大于最大向量的 x 或 y 值，则将其替换为相应的值。 如果此向量的 x 或 y 值小于最小向量的 x 或 y 值，则将其替换为相应的值。
     * 实现思路如下：先用Math.min( maxVal.x, this.x )计算，若this.x大于maxVal.x，则超出maxVal范围，取maxVal.x, 然后用Math.max( minVal.x, maxVal.y）
     * 获取到最大值，因为this.x比maxVal.x还大，就实现了把向量的分量限制在最大向量分量之内。若this.x小于maxVal.x，Math.min( maxVal.x, this.x )得到this.x
     * 代表this.x在maxVal.x范围之内，然后进行Math.max( minVal.x, this.x )，若this.x大于minVal.x的话，代表它在范围之内，则值不变，若小于minVal.x的话，
     * 则代表它小于范围，我们用Math.max来使this.x保持在minVal.x的范围之内
     * @param {*} minVal 最小的 x 和 y 值。
     * @param {*} maxVal 所需范围内的最大 x 和 y 值vf
     * @returns 
     */
    clamp( min, max ) {
        this.x = Math.max( min.x, Math.min( max.x, this.x ));
        this.y = Math.max( min.y, Math.min( max.y, this.y ));

        return this;
    }

    /**
     * 如果此向量的 x 或 y 值大于最大值，则它们将被最大值替换。 如果此向量的 x 或 y 值小于最小值，则将它们替换为最小值
     * @param {*} minVal 将被钳制到的最小值
     * @param {*} maxVal 将被钳制到的最大值
     * @returns 
     */
    clampScalar( minVal, maxVal ) {
        this.x = Math.max( minVal, Math.min( maxVal, this.x ) );
        this.y = Math.max( minVal, Math.min( maxVal, this.y ) );

        return this;
    }

    /**
     * 如果此向量的长度大于最大值，则将其替换为最大值。 如果此向量的长度小于最小值，则将其替换为最小值。
     * @param {*} min 长度将被限制到的最小值
     * @param {*} max 长度将被限制到的最大值
     * @returns 
     */
    clampLength( min, max ) {
        const length = this.length();
        return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );
    }

    /**
     * 获取向量的模
     * @returns 
     */
    length() {
        return Math.sqrt( this.x * this.x + this.y * this.y );
    }
}

export { Vector2 };