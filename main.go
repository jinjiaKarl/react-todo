package main

import (
	"embed"
	"fmt"
	"hello/api"
	"io/fs"
	"net/http"
)

// source: https://observiq.com/blog/embed-react-in-golang/
// another example: https://www.smartinary.com/blog/how-to-embed-a-react-app-in-a-go-binary/
func main() {
	api.Start()
}

//go:embed ui/build
var embeddedFiles embed.FS

func server() {
	fmt.Println("Starting Server")
	http.Handle("/", http.FileServer(getFileSystem()))
	http.Handle("/api/server", http.HandlerFunc(TestServer))
	http.ListenAndServe(":9000", nil)
}

func getFileSystem() http.FileSystem {

	// Get the build subdirectory as the
	// root directory so that it can be passed
	// to the http.FileServer
	fsys, err := fs.Sub(embeddedFiles, "ui/build")
	if err != nil {
		panic(err)
	}
	return http.FS(fsys)
}

func TestServer(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Server Data\n")
}
