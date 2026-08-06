import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, NotebookPen } from 'lucide-react';
import { toast } from 'sonner';
import { useCreatePost } from '@/hooks/useCreatePost';
import { useMe } from '@/hooks/useMe';
import { isAdmin, generatePostSlug } from '@/utils/helper';
import InputTags from '@/components/InputTags';
import MarkdownEditor from '@/components/MarkdownEditor';
import UploadImageModal from '@/components/UploadImageModal';
import SelectImageModal from '@/components/SelectImageModal';

const wrapperStyle = 'flex flex-col gap-2';
const gridWrapperStyle = 'grid gap-2 grid-cols-1 sm:grid-cols-2';
const inputStyle =
  'border border-neutral-800 rounded-md p-2 focus:outline-none focus:border-neutral-600 bg-neutral-950 text-neutral-100';
const labelStyle = 'text-sm font-medium text-neutral-300';

export default function CreatePostView() {
  const [titleEn, setTitleEn] = useState('');
  const [titleZh, setTitleZh] = useState('');
  const [aboutEn, setAboutEn] = useState('');
  const [aboutZh, setAboutZh] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [contentZh, setContentZh] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');

  const { createPost, isPending } = useCreatePost();
  const { data: user, isLoading } = useMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isAdmin(user)) {
      toast.error("You don't have permission to create posts");
      //   navigate('/', { replace: true });
    }
  }, [user, navigate]);

  //   if (isLoading) {
  //     return (
  //       <div className='flex items-center justify-center min-h-[60vh] gap-2 text-neutral-400'>
  //         <Loader2 className='animate-spin' size={20} />
  //         <span>Checking permissions...</span>
  //       </div>
  //     );
  //   }

  const handleSubmit = () => {
    if (tags.length === 0) {
      return toast.error('Please enter tags');
    }
    if (!imageUrl) {
      return toast.error('Please select cover photo');
    }
    if (!titleEn.trim()) {
      return toast.error('Please enter English title');
    }

    const slug = generatePostSlug(titleEn);
    createPost({
      slug,
      titleEn: titleEn.trim(),
      titleZh: titleZh.trim(),
      aboutEn: aboutEn.trim(),
      aboutZh: aboutZh.trim(),
      contentEn,
      contentZh,
      tags,
      imageUrl,
    });
  };

  return (
    <section className='relative'>
      <div className='relative'>
        <div className='layout text-center pb-12 pt-28 md:pb-20 md:pt-36 flex flex-col items-center justify-center'>
          <div className='size-11 rounded-xl flex items-center justify-center relative bg-neutral-900/80 backdrop-blur-sm'>
            <NotebookPen className='text-accent' size={20} strokeWidth={1} />
          </div>
          <h1 className='mt-4 text-6xl'>
            <span className='text-neutral-300 font-semibold'> Create </span>
            <span className='font-semibold transition-colors bg-gradient-to-br from-accent/30 via-accent/90 to-accent/30 bg-clip-text text-transparent'>
              Post
            </span>
          </h1>
        </div>
      </div>

      <div className='border-t border-neutral-900 bg-black pt-20'>
        <div className='layout pb-24'>
          <div className='flex flex-col gap-6 text-neutral-100'>
            <div className={gridWrapperStyle}>
              <div className={wrapperStyle}>
                <label htmlFor='titleEn' className={labelStyle}>
                  Title – English
                </label>
                <input
                  id='titleEn'
                  className={inputStyle}
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                />
              </div>
              <div className={wrapperStyle}>
                <label htmlFor='titleZh' className={labelStyle}>
                  Title – 中文
                </label>
                <input
                  id='titleZh'
                  className={inputStyle}
                  value={titleZh}
                  onChange={(e) => setTitleZh(e.target.value)}
                />
              </div>
            </div>

            <div className={gridWrapperStyle}>
              <div className={wrapperStyle}>
                <label htmlFor='aboutEn' className={labelStyle}>
                  About – English
                </label>
                <textarea
                  id='aboutEn'
                  className={inputStyle}
                  value={aboutEn}
                  onChange={(e) => setAboutEn(e.target.value)}
                />
              </div>
              <div className={wrapperStyle}>
                <label htmlFor='aboutZh' className={labelStyle}>
                  About – 中文
                </label>
                <textarea
                  id='aboutZh'
                  className={inputStyle}
                  value={aboutZh}
                  onChange={(e) => setAboutZh(e.target.value)}
                />
              </div>
            </div>

            <div className={gridWrapperStyle}>
              <div className={wrapperStyle}>
                <label htmlFor='tags' className={labelStyle}>
                  Tags
                </label>
                <InputTags tags={tags} onUpdate={setTags} />
              </div>
              <div className={wrapperStyle}>
                <label className={labelStyle}>Cover Photo</label>
                <div className='flex items-center h-full gap-2'>
                  <UploadImageModal />
                  <SelectImageModal onChange={setImageUrl} />
                  {imageUrl && <p className='text-xs text-neutral-400'>Selected</p>}
                </div>
              </div>
            </div>

            <div className={wrapperStyle}>
              <label className={labelStyle}>Content – English</label>
              <MarkdownEditor initialContent={contentEn} onChange={setContentEn} />
            </div>

            <div className={wrapperStyle}>
              <label className={labelStyle}>Content – 中文</label>
              <MarkdownEditor initialContent={contentZh} onChange={setContentZh} />
            </div>

            <div className='mt-2'>
              <button
                type='button'
                onClick={handleSubmit}
                disabled={isPending}
                className='w-56 hover:bg-neutral-700 bg-neutral-900 border border-neutral-800 text-neutral-400 transition-colors px-4 py-2 rounded-lg font-medium disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer'
              >
                Publish Blog Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
