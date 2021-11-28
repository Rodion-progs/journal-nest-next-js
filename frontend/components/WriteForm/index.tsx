import React, {useEffect, useState} from 'react';
import {Button, Input} from "@material-ui/core";
import styles from './WriteForm.module.scss';
import dynamic from "next/dynamic";
import {Api} from '../../utils/api';
import {PostItem} from '../../utils/api/types';
import {useRouter} from 'next/router';

const Editor = dynamic(() => import('../Editor').then(m => m.Editor), { ssr: false })

interface WriteFormProps {
    post?: PostItem;
}

export const WriteForm: React.FC<WriteFormProps> = ({ post }) => {
    const { push } = useRouter();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [blocks, setBlocks] = useState([]);
    
    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setBlocks(post.body);
        }
    }, [post])
    
    const addPost = async () => {
      try {
          setLoading(true)
          const obj = {
              title,
              body: blocks
          }
          if (!post) {
              const data = await Api().post.create(obj)
              push(`write/${data.id}`);
              return data;
              
          }
          const data = await Api().post.update(obj, post.id)
          return data;
        
      } catch (e) {
          console.warn(e)
      } finally {
          setLoading(false)
      }
    }
    
    return (
        <div>
            <Input classes={{ root: styles.titleField }}
                   onChange={(e) => setTitle(e.target.value)}
                   placeholder="Заголовок" value={title}
            />
            <div className={styles.editor}>
                <Editor initialBlocks={blocks} onChange={setBlocks} />
            </div>
            <Button disabled={loading || !blocks.length || !title} onClick={addPost} variant="contained" color="primary">
                {post ? 'Сохранить' : 'Опубликовать'}
            </Button>
        </div>
    );
};
