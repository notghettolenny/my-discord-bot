# encoding: utf-8
# module typing.re
# from (pre-generated)
# by generator 1.147
""" Wrapper namespace for re type aliases. """
# no imports

# functions

def Match(*args, **kwargs): # real signature unknown
    """
    The central part of internal API.
    
        This represents a generic version of type 'origin' with type arguments 'params'.
        There are two kind of these aliases: user defined and special. The special ones
        are wrappers around builtin collections and ABCs in collections.abc. These must
        have 'name' always set. If 'inst' is False, then the alias can't be instantiated,
        this is used by e.g. typing.List and typing.Dict.
    """
    pass

def Pattern(*args, **kwargs): # real signature unknown
    """
    The central part of internal API.
    
        This represents a generic version of type 'origin' with type arguments 'params'.
        There are two kind of these aliases: user defined and special. The special ones
        are wrappers around builtin collections and ABCs in collections.abc. These must
        have 'name' always set. If 'inst' is False, then the alias can't be instantiated,
        this is used by e.g. typing.List and typing.Dict.
    """
    pass

# no classes
# variables with complex values

__all__ = [
    'Pattern',
    'Match',
]

__weakref__ = None # (!) real value is "<attribute '__weakref__' of 'typing.re' objects>"

