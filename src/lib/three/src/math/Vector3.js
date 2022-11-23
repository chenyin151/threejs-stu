class Vector3 {
    constructor( x = 0, y = 0, z = 0 ) {
        Vector3.prototype.isVector3 = true;

        this.x = x;
        this.y = y;
        this.z = z;
    }

    set( x, y, z ) {
        // sprite.scale.set(x,y),当没有设置z的时候，this.z就用默认值
        if ( z === undefined ) z = this.z;

        this.x = x;
        this.y = y;
        this.z = z;

        return this;
    }

    setScalar( scalar ) {
        this.x = scalar;
        this.y = scalar;
        this.z = scalar;

        return this;
    }

    setX( x ) {
        this.x = x;

        return this;
    }

    setY( y ) {
        this.y = y;
        
        return this;
    }

    setZ( z ) {
        this.z = z;
        
        return this;
    }

    setComponent( index, value ) {
        switch ( index ) {
            case 0: this.x = value; break;
            case 1: this.y = value; break;
            case 2: this.z = value; break;
            default: throw new Error( 'index is out of range: ' + index );
        }
        return this;
    }

    getComponent( index ) {
        switch( index ) {
            case 0: return this.x;
            case 1: return this.y;
            case 2: return this.z;
            default: throw new Error( 'index is out of range: ' + index );
        }
    }

    clone() {
        return new this.constructor( this.x, this.y, this.z );
    }

    copy( v ) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;

        return this;
    }

    add( v ) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;

        return this;
    }

    addScalar( s ) {
        this.x += s;
        this.y += s;
        this.z += s;

        return this;
    }

    addVectors( a, b ) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;

        return this;
    }
}