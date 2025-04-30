import React, { useEffect } from 'react'; // useEffect'i import et
import { useSelector, useDispatch } from 'react-redux'; // useSelector ve useDispatch'i import et
import { notlariAlAPI } from '../store/actions'; // notlariAlAPI action'ını import et
import Post from './Post';

const PostList = () => {
  const dispatch = useDispatch(); // useDispatch hook'unu al
  const notlar = useSelector((state) => state.notlar); // store'dan notları al

  useEffect(() => {
    // Component mount edildiğinde notları API'den al
    dispatch(notlariAlAPI());
  }, [dispatch]); // dispatch bağımlılığı ekleniyor (genellikle gerekmez ama linter uyarısını engeller)

  return notlar.length === 0 ? (
    <div className="beyazKutu text-center p-6">Hiç notunuz yok</div>
  ) : (
    <div>
      {notlar.map((not) => (
        <Post item={not} key={not.id} />
      ))}
    </div>
  );
};

export default PostList;
