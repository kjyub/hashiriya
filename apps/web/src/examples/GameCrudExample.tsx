import { Button, InputContainer, Modal } from '@ui';
import ModalPortal from '@ui/components/overlay/ModalPortal';
import useToastMessageStore from '@ui/components/overlay/ToastMessage/store';
import { useState } from 'react';

import { useCreateGame, useDeleteGame, useGames, useUpdateGame } from '../hooks/useGames';

import type { Tables } from '@api/types/supabase';

interface GameFormProps {
  initialData?: Tables<'games'>;
  onClose: () => void;
}

function GameForm({ initialData, onClose }: GameFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [code, setCode] = useState(initialData?.code || '');
  const [tagsInput, setTagsInput] = useState(initialData?.tags?.join(', ') || '');
  const createToast = useToastMessageStore((state) => state.create);

  const { mutate: createGame } = useCreateGame();
  const { mutate: updateGame } = useUpdateGame();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code) {
      createToast('Name and Code are required!');
      return;
    }

    // 태그 문자열을 배열로 변환 (쉼표로 구분, 공백 제거)
    const tags = tagsInput
      .split(',')
      .map((tag: string) => tag.trim())
      .filter((tag: string) => tag.length > 0);

    const gameData = {
      name,
      code,
      tags: tags.length > 0 ? tags : undefined,
    };

    if (initialData) {
      updateGame(
        { id: initialData.id, updatedGame: gameData },
        {
          onSuccess: () => {
            createToast('Game updated successfully!');
            onClose();
          },
          onError: (error) => {
            createToast(`Failed to update game: ${error.message}`);
          },
        },
      );
    } else {
      createGame(gameData, {
        onSuccess: () => {
          createToast('Game created successfully!');
          onClose();
        },
        onError: (error) => {
          createToast(`Failed to create game: ${error.message}`);
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputContainer label="Game Name">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter game name..." />
      </InputContainer>
      <InputContainer label="Game Code">
        <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter game code..." />
      </InputContainer>
      <InputContainer label="Tags">
        <input
          type="text"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="쉼표(,)로 구분하여 여러 태그를 입력할 수 있습니다"
        />
      </InputContainer>
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" onClick={onClose} variant="transparent">
          Cancel
        </Button>
        <Button type="submit">{initialData ? 'Update Game' : 'Create Game'}</Button>
      </div>
    </form>
  );
}

export function GameCrudExample() {
  const { data: games, isLoading, error, refetch } = useGames();
  const { mutate: deleteGame } = useDeleteGame();
  const createToast = useToastMessageStore((state) => state.create);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<Tables<'games'> | null>(null);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      deleteGame(id, {
        onSuccess: () => {
          createToast('Game deleted successfully!');
        },
        onError: (error) => {
          createToast(`Failed to delete game: ${error.message}`);
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-white font-medium">Loading games...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 flex items-center justify-center">
        <div className="text-center p-8 bg-red-900/20 rounded-2xl border border-red-500/30">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Error Loading Games</h2>
          <p className="text-red-300 text-lg">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Game Management
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Create, read, update, and delete games with a beautiful interface
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <span className="mr-2">🎮</span>
            Add New Game
          </Button>
          <Button onClick={() => refetch()} variant="transparent">
            <span className="mr-2">🔄</span>
            Refresh Games
          </Button>
        </div>

        {/* Games List */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {games && games.length > 0 ? `Games (${games.length})` : 'No Games Found'}
          </h2>

          {games && games.length > 0 ? (
            <div className="grid gap-4">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{game.name}</h3>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                          {game.code}
                        </span>
                        <span className="text-gray-400 text-sm">ID: {game.id}</span>
                      </div>
                      {/* Tags Display */}
                      {game.tags && game.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {game.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-md text-xs font-medium border border-purple-500/30"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={() => setEditingGame(game)} variant="transparent">
                        <span className="mr-2">✏️</span>
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete(game.id)} variant="transparent">
                        <span className="mr-2">🗑️</span>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">🎮</div>
              <h3 className="text-2xl font-bold text-white mb-4">No Games Available</h3>
              <p className="text-gray-400 text-lg mb-8">Start by creating your first game to get started!</p>
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <span className="mr-2">✨</span>
                Create First Game
              </Button>
            </div>
          )}
        </div>

        {/* Create Game Modal */}
        <ModalPortal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
          <Modal title="Create New Game" closeButton={true}>
            <GameForm onClose={() => setIsCreateModalOpen(false)} />
          </Modal>
        </ModalPortal>

        {/* Edit Game Modal */}
        <ModalPortal isOpen={editingGame !== null} onClose={() => setEditingGame(null)}>
          <Modal title="Edit Game" closeButton={true}>
            <GameForm initialData={editingGame || undefined} onClose={() => setEditingGame(null)} />
          </Modal>
        </ModalPortal>
      </div>
    </div>
  );
}
