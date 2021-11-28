import { Post } from '../components/Post';
import { MainLayout } from '../layouts/MainLayout';
import {Api} from '../utils/api';
import { PostItem } from '../utils/api/types';
import {NextPage} from 'next';

interface HomeProps {
    posts: PostItem[];
}

const Home: NextPage<HomeProps> = ({posts}) => {
    return (
        <MainLayout>
            {posts && posts.map(post =>
                <Post
                    key={post.id}
                    title={post.title}
                    id={post.id}
                    description={post.description}
                    imageUrl={''}
                />)}
        </MainLayout>
    );
}

export const getServerSideProps = async ctx => {
    try {
        const posts = await Api().post.getAll();
        return {
            props: {
                posts
            }
        }
    } catch (e) {
        console.warn(e)
    }
    return {
        props: {
            posts: null
        }
    }
};

export default Home;
