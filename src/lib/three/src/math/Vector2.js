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
        // 先转换为单位向量，然后判断模，若模大于max，则为max，若小于min,则为min
        return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );
    }

    /**
     * 向下取整
     * @returns 
     */
    floor() {
        this.x = Math.floor( this.x );
        this.y = Math.floor( this.y );

        return this;
    }

    /**
     * 向上取整
     * @returns 
     */
    ceil() {
        this.x = Math.ceil( this.x );
        this.y = Math.ceil( this.y );

        return this;
    }

    /**
     * 四舍五入
     * @returns 
     */
    round() {
        this.x = Math.round( this.x );
        this.y = Math.round( this.y );

        return this;
    }

    /**
     * 取距离0最近的整数（如果为负则向上舍入，如果为正则向下舍入），比如-1.2取距离0最近的整数则是-1,1.2则是1
     * @returns 
     */
    roundToZero() {
        this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
        this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );

        return this;
    }

    /**
     * 向量点乘
     * @param {*} v 另个向量
     */
    dot( v ) {
        return this.x * v.x + this.y * v.y;
    }

    /**
     * 向量叉乘（二维向量的叉积相当于行列式的值，是计算出两个向量围成的面积，严格意义上说，二维向量没叉乘)
     * @param {*} 
     * @returns 
     */
    cross( v ) {
        return this.x * v.y - this.y * v.x;
    }

    /**
     * 计算从(0, 0)点到(x, y)的直线长度的平方，若比较2个向量的长度，这样比较省去了开方计算的开销
     * @returns 
     */
    lengthSq() {
        return this.x * this.x + this.y * this.y;
    }

    /**
     * 获取向量的模
     * @returns 
     */
    length() {
        return Math.sqrt( this.x * this.x + this.y * this.y );
    }
    /**
     * 计算此向量的曼哈顿长度。曼哈度距离也称为城市街区距离。比如有2个点a(0, 0)和b(3, 3),
     * 我们在实际生活中不可能走直线距离，除非你会穿越建筑物，否则你只能按照街区的街道走。在
     * 这个算法中，只能先沿着这个向量在x轴投射的距离走，在沿着Y轴走
     * @returns 
     */
    manhattanLength() {
        return Math.abs( this.x ) + Math.abs( this.y );
    }

    /**
     * 将此向量转为单位向量(转换为模为1的向量)
     * @returns 
     */
    normalize() {
        return this.divideScalar( this.length() || 1 );
    }

    /**
     * 计算此向量相对于正x轴的弧度角.
     * Math.atan2算出的度数是-180 < x < 180,若要计算出0 < x < 360的，这个时候我们要把xy分别
     * 取相反数（相差180的坐标值的每个分量都是相反数），得到的弧度值在加上Math.PI,就是我们要的0到360的弧度值
     * @returns 
     */
    angle() {
        const angle = Math.atan2( - this.y, - this.x ) + Math.PI;
        return angle;
    }

    /**
     * 计算从该向量到 v 的距离
     * @param {*} v 
     * @returns 
     */
    distanceTo( v ) {
        return Math.sqrt( this.distanceToSquared( v ) );
    }
    /**
     * 计算从该向量到 v 的平方距离。如果您只是将该距离与另一个距离进行比较，则应该比较距离的平方，因为它的计算效率稍微高一些。
     * @param {*} v 
     * @returns 
     */
    distanceToSquared( v ) {
        const dx = this.x - v.x, dy = this.y - v.y;;
        return dx * dx + dy * dy;
    }

    /**
     * 计算从该向量到 v 的曼哈顿距离
     * @param {*} v 
     * @returns 
     */
    manhattanDistanceTo( v ) {
        return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y );
    }

    /**
     * 将此向量的长度设置为length
     * @param {*} length 
     * @returns 
     */
    setLength( length ) {
        // 先把向量的长度设置为1，再相应缩放length长度
        return this.normalize().multiplyScalar( length );
    }

    /**
     * 在此向量和 v 之间进行线性插值，其中 alpha 是沿线的百分比距离 - alpha = 0 将是此向量，而 alpha = 1 将是 v
     * @param {*} v      要插值的 Vector2
     * @param {*} alpha 插值因子，通常在闭区间 [0, 1] 内
     * @returns 
     */
    lerp( v, alpha ) {
        this.x += ( v.x - this.x ) * alpha;
        this.y += ( v.y - this.y ) * alpha;

        return this;
    }

    /**
     * 将此向量设置为在 v1 和 v2 之间线性插值的向量，其中 alpha 是沿连接两个向量的直线的百分比距离 - alpha = 0 将是 v1，alpha = 1 将是 v2
     * @param {*} v1 起始的Vector2
     * @param {*} v2 要插值的 Vector2
     * @param {*} alpha 插值因子，通常在闭区间 [0, 1] 内
     * @returns 
     */
    lerpVectors( v1, v2, alpha ) {
        this.x = v1.x + ( v2.x - v1.x ) * alpha;
        this.y = v1.y + ( v2.y - v1.y ) * alpha;

        return this;
    }

    // 如果此向量和 v 的分量严格相等，则返回 true；否则为false
    equals( v ) {
        return ( ( v.x === this.x ) && ( v.y === this.y ) );
    }

    /**
     * 将此向量的 x 值设置为 array[offset] 并将 y 值设置为 array[offset + 1]
     * 也就是说用数组给Vector2赋值，比如 Vector2.fromArray[1,2]后的结果是Vector2(1,2)
     * @param {*} array 源数组
     * @param {*} offset 数组中的偏移量。默认为 0
     * @returns 
     */
    fromArray( array, offset = 0 ) {
        this.x = array[ offset ];
        this.y = array [ offset + 1 ];

        return this;
    }

    /**
     * 将此向量转换成数组返回
     * @param {*} array 
     * @param {*} offset 
     * @returns 
     */
    toArray( array = [], offset = 0 ) {
        array[ offset ] = this.x;
        array[ offset + 1 ] = this.y;

        return array;
    }

    /**
     * 根据属性设置此向量的 x 和 y 值
     * @param {*} attribute 源属性
     * @param {*} index 索引
     * @returns 
     */
    fromBufferAttribute( attribute, index ) {
        this.x = attribute.getX( index );
        this.y = attribute.getY( index );

        return this;
    }

    /**
     * 将此矢量围绕中心点旋转某个角度
     * @param {*} center 要围绕旋转的中心点
     * @param {*} angle 要旋转的角度，以弧度为单位
     * @returns 
     */
    rotateAround( center, angle ) {
        // 计算原理是： x = Math.cos( angle ) * r;  y = Math.sin( angle ) * r;
        const c = Math.cos( angle ), s = Math.sin( angle );

        const x = this.x - center.x;
        const y = this.y - center.y;

        this.x = x * c - y * s + center.x;
        this.y = x * s - y * c + center.y;

        return this;
    }

    /**
     * 将此向量的每个分量设置为介于 0 和 1 之间的伪随机值，不包括 1
     * @returns 
     */
    random() {
        this.x = Math.random();
        this.y = Math.random();

        return this;
    }
    /**
     * 翻转向量（就是每个分量取相反数),按原点翻转
     * @returns 
     */
    negate() {
        this.x = - this.x;
        this.y = - this.y;

        return this;
    }

    *[ Symbol.iterator ]() {
        yield this.x;
        yield this.y;
    }
}

export { Vector2 };