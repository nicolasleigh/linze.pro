import { defineComponent } from "vue";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "PostCard",

  props: {
    id: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
    username: { type: String, required: true },
    userEmail: { type: String, required: true },
  },

  setup(props) {
    const date = new Date(props.updatedAt);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const router = useRouter();
    return () => (
      <div
        onClick={() => router.push({ path: `/post/${props.id}` })}
        class="hover:shadow-lg hover:-mt-3 hover:mb-3 transition-all duration-500 cursor-pointer overflow-hidden rounded-xl"
      >
        <Card>
          <CardHeader>
            <CardTitle>{props.title}</CardTitle>
            <CardDescription>{props.username}</CardDescription>
          </CardHeader>
          <CardContent>{props.content}...</CardContent>
          <CardFooter>{formattedDate}</CardFooter>
        </Card>
      </div>
    );
  },
});
