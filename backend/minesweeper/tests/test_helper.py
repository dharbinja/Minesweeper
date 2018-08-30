from minesweeper.models import Difficulty, Tile, Game


def create_difficulty(name=None, rows=1, cols=1, id=None):
    """
    Create a difficulty with the given parameters.
    """
    return Difficulty.objects.create(name=name, rows=rows, columns=cols, id=id)


def create_game(difficulty, time_started=None, time_ended=None, result=None):
    """
    Creates a game with the given parameters
    """
    return Game.objects.create(difficulty=difficulty)


def create_tile(game, id=None):
    """
    Creats a tile from only a game
    """
    return Tile.objects.create(game=game, id=id)
