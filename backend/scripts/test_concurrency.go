package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"sync"
)

type UpdatePostPayload struct {
	Title   *string `json:"title"`
	Content *string `json:"content"`
}

func updatePost(postID int, post UpdatePostPayload, wg *sync.WaitGroup) {
	defer wg.Done()

	url := fmt.Sprintf("http://localhost:8080/v1/posts/%d", postID)

	b, _ := json.Marshal(post)

	req, err := http.NewRequest("PATCH", url, bytes.NewBuffer(b))
	if err != nil {
		fmt.Println("Error creating request:", err)
	}

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return
	}
	defer resp.Body.Close()
	fmt.Println("Update response status:", resp.Status)
}

func main() {
	var wg sync.WaitGroup

	postID := 5

	// Simulate User A an User B updating the same post
	content := "NEW CONTENT FROM USER B"
	title := "NEW TITLE FROM USER A"

	wg.Add(2)
	go updatePost(postID, UpdatePostPayload{Title: &title}, &wg)
	go updatePost(postID, UpdatePostPayload{Content: &content}, &wg)
	wg.Wait()
}
