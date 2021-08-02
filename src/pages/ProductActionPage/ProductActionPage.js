import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { actAddProductRequest, actGetProductRequest,actUpdateProductRequest, actDeleteProductEdit } from './../../actions/index';
import { connect } from 'react-redux';

function ProductActionPage(props) {

    const { history, match } = props;
    const [id, setId] = useState(null);
    const [txtName, setName] = useState('');
    const [txtPrice, setPrice] = useState('');
    const [cbStatus, setCbStatus] = useState(false);

    useEffect(() => {
        if (match) {
            var { id } = match.params;
            props.onEditProduct(id);
        }else {
            props.onDeleteProductEdit()
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(Object.keys(props.itemEditing).length > 0) {
            const {id, name, price, status} = props.itemEditing
            setId(id);
            setName(name);
            setPrice(price);
            setCbStatus(status);
        }else {
            setId(null)
            setName('');
            setPrice('');
            setCbStatus(false);
        }
        // eslint-disable-next-line
    }, [props.itemEditing])
    

    const onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        switch (name) {
            case 'txtPrice':
                setPrice(value)
                break;
            case 'cbStatus':
                setCbStatus(value)
                break;
            default:
                setName(value)
                break;
        }
    }

    const onSave = (e) => {
        e.preventDefault();
        var product = {
            id: id,
            name: txtName,
            price: txtPrice,
            status: cbStatus
        };
        if (id) {
        props.onUpdateProduct(product);
        } else {
            props.onAddProduct(product);
        }
        history.goBack();
    }
    return (
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <form onSubmit={onSave}>
                <div className="form-group">
                    <label>Tên sản phẩm: </label>
                    <input
                        type="text"
                        className="form-control"
                        name="txtName"
                        value={txtName}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Giá: </label>
                    <input
                        type="text"
                        className="form-control"
                        name="txtPrice"
                        value={txtPrice}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Trạng thái: </label>
                </div>
                <div className="checkbox">
                    <label>
                        <input
                            type="checkbox"
                            name="cbStatus"
                            value={cbStatus}
                            onChange={onChange}
                            checked={cbStatus}
                        />
                        Còn hàng
                    </label>
                </div>
                <Link to="/product-list" className="btn btn-danger mr-10">
                    Trở lại
                </Link>
                <button type="submit" className="btn btn-primary">Lưu lại</button>
            </form>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        itemEditing: state.itemEditing
    }
}

const mapDipatchToProps = (dispatch, props) => {
    return {
        onAddProduct : (product) => {
            dispatch(actAddProductRequest(product))
        },
        onEditProduct : (id) => {
            dispatch(actGetProductRequest(id))
        },
        onUpdateProduct : (product) => {
            dispatch(actUpdateProductRequest(product));
        },
        onDeleteProductEdit: () => {
            dispatch(actDeleteProductEdit());
        }
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(ProductActionPage);
