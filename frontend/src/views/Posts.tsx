import { usePosts } from "@/hooks/usePosts";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Posts",

  setup() {
    const { posts, error, isLoading } = usePosts();
    return () => {
      return <div>Posts</div>;
    };
  },
});
