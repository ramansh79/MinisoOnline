<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Resources\PostResource;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = auth()->user()->posts()->orderBy("created_at","desc")->paginate(perPage: 5);

        return PostResource::collection($posts);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
        ]);

        $data['slug'] = Str::slug($data['title']);

        auth()->user()->posts()->create($data); //A slug is a string where spaces are replaced by hyphens and all letters are lowercase

        return response()->json([
            'status' => 'success',
            'message' => 'post created successfully',
        ], status: 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $post = Post::where('slug',$slug)->firstOrFail();
        return new PostResource($post);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $slug)
    {
        $post = Post::where('slug',$slug)->firstOrFail();
        $data = $request->validate([
            'title' => ['required', 'string' , 'string'],
            'body' => ['required', 'string'],
        ]);

        $data['slug'] = Str::slug($data['title']);
        $post->update($data);
        return new PostResource(resource: $post);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($slug)
    {
        $post = Post::where('slug',$slug)->firstOrFail();
        $post->delete();
        return response(null, 204);
    }
}
