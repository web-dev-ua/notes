<?php

namespace App\Http\Controllers;

use App\Http\Requests\NoteRequest;
use App\Http\Resources\NoteCollection;
use App\Http\Resources\NoteResource;
use App\Models\Note;
use Illuminate\Http\Response;

class NoteController extends Controller
{
    public function index()
    {
        $notes = Note::orderBy('id', 'desc')->paginate(9);

        return response(new NoteCollection($notes), Response::HTTP_OK);
    }

    public function store(NoteRequest $request)
    {
        $note = new Note;
        $note->store($request->validated());

        return $this->show($note);
    }

    public function show(Note $note)
    {
        return response(new NoteResource($note), Response::HTTP_OK);
    }

    public function update(NoteRequest $request, Note $note)
    {
        $note->store($request->validated());

        return $this->show($note);
    }

    public function destroy(Note $note)
    {
        $note->delete();

        return response(null, Response::HTTP_OK);
    }
}
