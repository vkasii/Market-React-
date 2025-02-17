import styles from './Detail.module.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Spinner from '../../components/spinner/Spinner'
import { useSelector } from 'react-redux';

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({})
  const { products, loading } = useSelector(state => state.products)

  useEffect(() => {
    setProduct(products.find(product => product.id === +id));
  }, [products, id])

  if (!product) return <p>Product not found</p>;

  return (
    <>
      {loading
        ? <Spinner />
        : product
          ? <div className='container'>
            <div className={styles.productContainer}>
              <img className={styles.image} src={product.thumbnail} alt={product.title} loading='lazy' />
              <div className={styles.infoContainer}>
                <h2 className={styles.title}>{product.title}</h2>
                <p className={`${styles.price} action-color`}>${product.price}</p>
                <p className={styles.rating}>Rating: <span className={product.rating > 4 ? styles.goodRating : product.rating > 3 ? styles.normalRating : styles.badRating}>{product.rating} of 5</span></p>
                <p >{product.returnPolicy}</p>
                <p >{product.shippingInformation}</p>
                <p className={styles.description}>Description</p>
                <p>{product.description}</p>
              </div>
            </div>
            {product.reviews
              && <ul className={styles.reviewsContainer}>
                <h2 className={styles.title}>Reviews</h2>
                {product.reviews.map((review, index) => (
                  <li key={index} className={styles.reviewItem}>
                    <p className={styles.reviewerName}>{review.reviewerName}</p>
                    <p className={styles.reviewerEmail}>{review.reviewerEmail}</p>
                    <p className={styles.reviewRating}>Rating: <span className={review.rating > 4 ? styles.goodRating : review.rating > 3 ? styles.normalRating : styles.badRating}>{review.rating}</span></p>
                    <p className={styles.comment}>{review.comment}</p>
                    <p className={styles.date}>{review.date}</p>
                  </li>
                ))}
              </ul>}
          </div>
          : <p>Error with product detail loading</p>
      }
    </>
  )
}

export default Detail
