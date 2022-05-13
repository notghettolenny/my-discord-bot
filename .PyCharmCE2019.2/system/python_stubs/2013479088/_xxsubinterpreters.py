# encoding: utf-8
# module _xxsubinterpreters
# from (built-in)
# by generator 1.147
"""
This module provides primitive operations to manage Python interpreters.
The 'interpreters' module provides a more convenient interface.
"""
# no imports

# functions

def channel_close(cid, *args, **kwargs): # real signature unknown; NOTE: unreliably restored from __doc__ 
    """
    channel_close(cid, *, send=None, recv=None, force=False)
    
    Close the channel for all interpreters.
    
    If the channel is empty then the keyword args are ignored and both
    ends are immediately closed.  Otherwise, if 'force' is True then
    all queued items are released and both ends are immediately
    closed.
    
    If the channel is not empty *and* 'force' is False then following
    happens:
    
     * recv is True (regardless of send):
       - raise ChannelNotEmptyError
     * recv is None and send is None:
       - raise ChannelNotEmptyError
     * send is True and recv is not True:
       - fully close the 'send' end
       - close the 'recv' end to interpreters not already receiving
       - fully close it once empty
    
    Closing an already closed channel results in a ChannelClosedError.
    
    Once the channel's ID has no more ref counts in any interpreter
    the channel will be destroyed.
    """
    pass

def channel_create(): # real signature unknown; restored from __doc__
    """
    channel_create() -> cid
    
    Create a new cross-interpreter channel and return a unique generated ID.
    """
    pass

def channel_destroy(cid): # real signature unknown; restored from __doc__
    """
    channel_destroy(cid)
    
    Close and finalize the channel.  Afterward attempts to use the channel
    will behave as though it never existed.
    """
    pass

def channel_list_all(): # real signature unknown; restored from __doc__
    """
    channel_list_all() -> [cid]
    
    Return the list of all IDs for active channels.
    """
    pass

def channel_recv(cid): # real signature unknown; restored from __doc__
    """
    channel_recv(cid) -> obj
    
    Return a new object from the data at the from of the channel's queue.
    """
    pass

def channel_release(cid, *args, **kwargs): # real signature unknown; NOTE: unreliably restored from __doc__ 
    """
    channel_release(cid, *, send=None, recv=None, force=True)
    
    Close the channel for the current interpreter.  'send' and 'recv'
    (bool) may be used to indicate the ends to close.  By default both
    ends are closed.  Closing an already closed end is a noop.
    """
    pass

def channel_send(cid, obj): # real signature unknown; restored from __doc__
    """
    channel_send(cid, obj)
    
    Add the object's data to the channel's queue.
    """
    pass

def create(): # real signature unknown; restored from __doc__
    """
    create() -> ID
    
    Create a new interpreter and return a unique generated ID.
    """
    pass

def destroy(id): # real signature unknown; restored from __doc__
    """
    destroy(id)
    
    Destroy the identified interpreter.
    
    Attempting to destroy the current interpreter results in a RuntimeError.
    So does an unrecognized ID.
    """
    pass

def get_current(): # real signature unknown; restored from __doc__
    """
    get_current() -> ID
    
    Return the ID of current interpreter.
    """
    pass

def get_main(): # real signature unknown; restored from __doc__
    """
    get_main() -> ID
    
    Return the ID of main interpreter.
    """
    pass

def is_running(id): # real signature unknown; restored from __doc__
    """
    is_running(id) -> bool
    
    Return whether or not the identified interpreter is running.
    """
    return False

def is_shareable(obj): # real signature unknown; restored from __doc__
    """
    is_shareable(obj) -> bool
    
    Return True if the object's data may be shared between interpreters and
    False otherwise.
    """
    return False

def list_all(): # real signature unknown; restored from __doc__
    """
    list_all() -> [ID]
    
    Return a list containing the ID of every existing interpreter.
    """
    pass

def run_string(id, script, shared): # real signature unknown; restored from __doc__
    """
    run_string(id, script, shared)
    
    Execute the provided string in the identified interpreter.
    
    See PyRun_SimpleStrings.
    """
    pass

def _channel_id(*args, **kwargs): # real signature unknown
    pass

# classes

class ChannelError(RuntimeError):
    # no doc
    def __init__(self, *args, **kwargs): # real signature unknown
        pass

    __weakref__ = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default
    """list of weak references to the object (if defined)"""



class ChannelClosedError(ChannelError):
    # no doc
    def __init__(self, *args, **kwargs): # real signature unknown
        pass


class ChannelEmptyError(ChannelError):
    # no doc
    def __init__(self, *args, **kwargs): # real signature unknown
        pass


class ChannelID(object):
    """ A channel ID identifies a channel and may be used as an int. """
    def __eq__(self, *args, **kwargs): # real signature unknown
        """ Return self==value. """
        pass

    def __ge__(self, *args, **kwargs): # real signature unknown
        """ Return self>=value. """
        pass

    def __gt__(self, *args, **kwargs): # real signature unknown
        """ Return self>value. """
        pass

    def __hash__(self, *args, **kwargs): # real signature unknown
        """ Return hash(self). """
        pass

    def __index__(self, *args, **kwargs): # real signature unknown
        """ Return self converted to an integer, if self is suitable for use as an index into a list. """
        pass

    def __init__(self, *args, **kwargs): # real signature unknown
        pass

    def __int__(self, *args, **kwargs): # real signature unknown
        """ int(self) """
        pass

    def __le__(self, *args, **kwargs): # real signature unknown
        """ Return self<=value. """
        pass

    def __lt__(self, *args, **kwargs): # real signature unknown
        """ Return self<value. """
        pass

    def __ne__(self, *args, **kwargs): # real signature unknown
        """ Return self!=value. """
        pass

    def __repr__(self, *args, **kwargs): # real signature unknown
        """ Return repr(self). """
        pass

    def __str__(self, *args, **kwargs): # real signature unknown
        """ Return str(self). """
        pass

    end = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default
    """'send', 'recv', or 'both'"""

    recv = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default
    """the 'recv' end of the channel"""

    send = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default
    """the 'send' end of the channel"""



class ChannelNotEmptyError(ChannelError):
    # no doc
    def __init__(self, *args, **kwargs): # real signature unknown
        pass


class ChannelNotFoundError(ChannelError):
    # no doc
    def __init__(self, *args, **kwargs): # real signature unknown
        pass


class InterpreterID(object):
    """ A interpreter ID identifies a interpreter and may be used as an int. """
    def __eq__(self, *args, **kwargs): # real signature unknown
        """ Return self==value. """
        pass

    def __ge__(self, *args, **kwargs): # real signature unknown
        """ Return self>=value. """
        pass

    def __gt__(self, *args, **kwargs): # real signature unknown
        """ Return self>value. """
        pass

    def __hash__(self, *args, **kwargs): # real signature unknown
        """ Return hash(self). """
        pass

    def __index__(self, *args, **kwargs): # real signature unknown
        """ Return self converted to an integer, if self is suitable for use as an index into a list. """
        pass

    def __init__(self, *args, **kwargs): # real signature unknown
        pass

    def __int__(self, *args, **kwargs): # real signature unknown
        """ int(self) """
        pass

    def __le__(self, *args, **kwargs): # real signature unknown
        """ Return self<=value. """
        pass

    def __lt__(self, *args, **kwargs): # real signature unknown
        """ Return self<value. """
        pass

    @staticmethod # known case of __new__
    def __new__(*args, **kwargs): # real signature unknown
        """ Create and return a new object.  See help(type) for accurate signature. """
        pass

    def __ne__(self, *args, **kwargs): # real signature unknown
        """ Return self!=value. """
        pass

    def __repr__(self, *args, **kwargs): # real signature unknown
        """ Return repr(self). """
        pass

    def __str__(self, *args, **kwargs): # real signature unknown
        """ Return str(self). """
        pass


class RunFailedError(RuntimeError):
    # no doc
    def __init__(self, *args, **kwargs): # real signature unknown
        pass

    __weakref__ = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default
    """list of weak references to the object (if defined)"""



class __loader__(object):
    """
    Meta path import for built-in modules.
    
        All methods are either class or static methods to avoid the need to
        instantiate the class.
    """
    @classmethod
    def create_module(cls, *args, **kwargs): # real signature unknown
        """ Create a built-in module """
        pass

    @classmethod
    def exec_module(cls, *args, **kwargs): # real signature unknown
        """ Exec a built-in module """
        pass

    @classmethod
    def find_module(cls, *args, **kwargs): # real signature unknown
        """
        Find the built-in module.
        
                If 'path' is ever specified then the search is considered a failure.
        
                This method is deprecated.  Use find_spec() instead.
        """
        pass

    @classmethod
    def find_spec(cls, *args, **kwargs): # real signature unknown
        pass

    @classmethod
    def get_code(cls, *args, **kwargs): # real signature unknown
        """ Return None as built-in modules do not have code objects. """
        pass

    @classmethod
    def get_source(cls, *args, **kwargs): # real signature unknown
        """ Return None as built-in modules do not have source code. """
        pass

    @classmethod
    def is_package(cls, *args, **kwargs): # real signature unknown
        """ Return False as built-in modules are never packages. """
        pass

    @classmethod
    def load_module(cls, *args, **kwargs): # real signature unknown
        """
        Load the specified module into sys.modules and return it.
        
            This method is deprecated.  Use loader.exec_module instead.
        """
        pass

    def module_repr(module): # reliably restored by inspect
        """
        Return repr for the module.
        
                The method is deprecated.  The import machinery does the job itself.
        """
        pass

    def __init__(self, *args, **kwargs): # real signature unknown
        pass

    __weakref__ = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default
    """list of weak references to the object (if defined)"""


    __dict__ = None # (!) real value is "mappingproxy({'__module__': '_frozen_importlib', '__doc__': 'Meta path import for built-in modules.\\n\\n    All methods are either class or static methods to avoid the need to\\n    instantiate the class.\\n\\n    ', 'module_repr': <staticmethod object at 0x00000202A31A3490>, 'find_spec': <classmethod object at 0x00000202A31A34C0>, 'find_module': <classmethod object at 0x00000202A31A34F0>, 'create_module': <classmethod object at 0x00000202A31A3520>, 'exec_module': <classmethod object at 0x00000202A31A3550>, 'get_code': <classmethod object at 0x00000202A31A35E0>, 'get_source': <classmethod object at 0x00000202A31A3670>, 'is_package': <classmethod object at 0x00000202A31A3700>, 'load_module': <classmethod object at 0x00000202A31A3730>, '__dict__': <attribute '__dict__' of 'BuiltinImporter' objects>, '__weakref__': <attribute '__weakref__' of 'BuiltinImporter' objects>})"


# variables with complex values

__spec__ = None # (!) real value is "ModuleSpec(name='_xxsubinterpreters', loader=<class '_frozen_importlib.BuiltinImporter'>, origin='built-in')"

