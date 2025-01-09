package db

import (
	"context"
	"fmt"
	"log"
	"math/rand/v2"

	"github.com/nicolasleigh/social/internal/store"
)

var usernames = []string{
	"alice", "bob", "charlie", "dave", "eve", "frank", "grace", "hannah", "ian", "jane",
	"karl", "lily", "mike", "nancy", "oliver", "paul", "quinn", "rachel", "sam", "tom",
	"ursula", "victor", "wendy", "xander", "yara", "zane", "amber", "ben", "claire", "dan",
	"ella", "finn", "gwen", "harry", "iris", "jack", "kim", "leo", "mia", "noah",
	"olivia", "peter", "quincy", "riley", "sophie", "travis", "uustin", "vicky", "will",
	"xena", "yves", "zoe", "aaron", "briana", "chris", "dylan",
}

var titles = []string{
	"How to Boost Your Productivity in 5 Easy Steps",
	"The Ultimate Guide to Golang for Beginners",
	"10 Simple Tips to Improve Your Work-Life Balance",
	"Why Remote Work is Here to Stay",
	"The Best Tools for Managing Your Time Effectively",
	"5 Common Mistakes New Developers Make (And How to Avoid Them)",
	"How to Create a Successful Morning Routine",
	"Understanding the Basics of Object-Oriented Programming",
	"Why Learning to Code is a Life-Changing Skill",
	"How to Build Your First REST API with Go",
	"Mastering the Art of Focus: Tips That Actually Work",
	"The Benefits of Minimalism for Digital Nomads",
	"How to Stay Motivated During a Long-Term Project",
	"What Every Developer Should Know About Version Control",
	"How to Start a Side Project While Working Full-Time",
	"Breaking Down the Top Programming Paradigms",
	"The Importance of Networking in the Tech Industry",
	"5 Key Principles for Effective Communication in Teams",
	"A Beginner's Guide to Cloud Computing",
	"How to Manage Stress in a Fast-Paced Job",
}

var contents = []string{
	"Learning to code is like learning a new language. It requires patience, persistence, and practice. Start with small projects and build your confidence as you go.",
	"Remote work offers flexibility, but it also comes with its own set of challenges. It's important to have a designated workspace, establish routines, and use the right tools to stay connected.",
	"Effective time management is all about prioritizing tasks and avoiding distractions. Use techniques like the Pomodoro method or time-blocking to structure your day.",
	"Collaboration tools like Slack, Asana, and Trello can significantly improve team communication and productivity. Choose the ones that best suit your workflow and team size.",
	"When it comes to debugging code, always start with the simplest explanation. Print statements, unit tests, and a methodical approach will help you solve most problems efficiently.",
	"A successful morning routine sets the tone for the entire day. Start with activities that energize and focus your mind—whether it’s meditation, exercise, or reading.",
	"Object-Oriented Programming (OOP) revolves around the concepts of classes, objects, inheritance, and polymorphism. Understanding these principles is key to mastering OOP.",
	"Networking isn't just about collecting business cards; it’s about forming meaningful relationships. Attend events, follow up with new contacts, and be genuinely interested in others.",
	"The cloud has revolutionized the way businesses operate. Platforms like AWS, Google Cloud, and Azure provide scalable solutions for hosting applications and managing data.",
	"Git and version control are essential for collaborative development. Learn the basic commands (commit, push, pull, branch) and familiarize yourself with Git workflows.",
	"Minimalism isn’t just for physical possessions—it can be applied to your digital life as well. Keep your desktop organized, limit the apps you use, and declutter your online presence.",
	"When working on a long-term project, set clear milestones and celebrate small wins along the way. This will keep you motivated and give you a sense of progress.",
	"The best developers are those who are constantly learning. Stay updated with new programming languages, frameworks, and best practices to keep your skills sharp.",
	"Building a personal brand online is crucial in today’s digital world. Start by sharing your knowledge through blog posts, social media, and speaking engagements.",
	"Developing soft skills like communication, empathy, and leadership is just as important as technical expertise. Take time to develop these skills alongside your hard skills.",
	"Cloud computing is a game-changer for businesses of all sizes. It offers flexibility, scalability, and cost savings. But understanding the security implications is crucial.",
	"Always test your code! Writing unit tests and automated tests early in the development process can save you time and headaches down the road by catching bugs before they grow.",
	"Learning a new programming language might seem intimidating, but the concepts you learn in one language often translate well into others. Start with something simple and go from there.",
	"The world of software development is constantly evolving. Whether it's adopting new languages, frameworks, or tools, staying up-to-date will keep you competitive in the industry.",
	"One of the most important aspects of successful teams is clear communication. Make sure everyone knows the project goals, deadlines, and their specific responsibilities.",
	"To stay motivated, break your big tasks into smaller, more manageable chunks. Celebrate progress along the way to keep your energy up and reduce the risk of burnout.",
}

var tags = []string{
	"productivity", "golang", "programming", "tech", "remote-work",
	"developer-life", "cloud-computing", "minimalism", "self-improvement",
	"coding-tips", "time-management", "career-growth", "leadership",
	"web-development", "software-engineering", "startup", "entrepreneurship",
	"teamwork", "automation", "data-science",
}

var comments = []string{
	"Great post! I learned a lot about time management techniques.",
	"This is exactly what I needed to hear today. Thanks for sharing!",
	"I’ve been using Go for a while now, and this guide helped me understand some concepts better.",
	"I agree with your point on remote work. Flexibility is key, but communication is also crucial.",
	"This method really works for me. The Pomodoro technique has helped me stay focused.",
	"Excellent breakdown of object-oriented principles! I’ve been struggling with inheritance.",
	"I love how you explained debugging! Sometimes it’s the small things that can throw you off.",
	"Minimalism in the digital world is something I need to work on. Thanks for the tips!",
	"It’s refreshing to read about soft skills in tech. It’s easy to forget how important they are.",
	"I never thought of using unit tests for small projects. Definitely going to give it a try!",
}

func Seed(store store.Storage) {
	ctx := context.Background()

	users := generateUsers(100)
	for _, user := range users {
		if err := store.Users.Create(ctx, user); err != nil {
			log.Println("Error creating user:", err)
			return
		}
	}
	posts := generatePosts(200, users)
	for _, post := range posts {
		if err := store.Posts.Create(ctx, post); err != nil {
			log.Println("Error creating post:", err)
			return
		}
	}

	comments := generateComments(500, users, posts)
	for _, comment := range comments {
		if err := store.Comments.Create(ctx, comment); err != nil {
			log.Println("Error creating comment:", err)
			return
		}
	}
	log.Println("Seeding complete")
}

func generateUsers(num int) []*store.User {
	users := make([]*store.User, num)

	for i := 0; i < num; i++ {
		users[i] = &store.User{
			Username: usernames[i%len(usernames)] + fmt.Sprintf("%d", i),
			Email:    usernames[i%len(usernames)] + fmt.Sprintf("%d", i) + "@example.com",
			Password: "123123123",
		}
	}
	return users
}

func generatePosts(num int, users []*store.User) []*store.Post {
	posts := make([]*store.Post, num)

	for i := 0; i < num; i++ {
		user := users[rand.IntN(len(users))]
		posts[i] = &store.Post{
			UserID:  user.ID,
			Title:   titles[rand.IntN(len(titles))],
			Content: contents[rand.IntN(len(contents))],
			Tags: []string{
				tags[rand.IntN(len(tags))],
				tags[rand.IntN(len(tags))],
			},
		}
	}
	return posts
}

func generateComments(num int, users []*store.User, posts []*store.Post) []*store.Comment {
	cms := make([]*store.Comment, num)
	for i := 0; i < num; i++ {
		cms[i] = &store.Comment{
			PostID:  posts[rand.IntN(len(posts))].ID,
			UserID:  users[rand.IntN(len(users))].ID,
			Content: comments[rand.IntN(len(comments))],
		}
	}
	return cms
}
