# encoding: utf-8
# module _multiprocessing
# from (pre-generated)
# by generator 1.147
# no doc
# no imports

# functions

def closesocket(*args, **kwargs): # real signature unknown
    pass

def recv(*args, **kwargs): # real signature unknown
    pass

def sem_unlink(*args, **kwargs): # real signature unknown
    pass

def send(*args, **kwargs): # real signature unknown
    pass

# classes

class SemLock(object):
    """ Semaphore/Mutex type """
    def acquire(self, *args, **kwargs): # real signature unknown
        """ acquire the semaphore/lock """
        pass

    def release(self, *args, **kwargs): # real signature unknown
        """ release the semaphore/lock """
        pass

    def _after_fork(self, *args, **kwargs): # real signature unknown
        """ rezero the net acquisition count after fork() """
        pass

    def _count(self, *args, **kwargs): # real signature unknown
        """ num of `acquire()`s minus num of `release()`s for this process """
        pass

    def _get_value(self, *args, **kwargs): # real signature unknown
        """ get the value of the semaphore """
        pass

    def _is_mine(self, *args, **kwargs): # real signature unknown
        """ whether the lock is owned by this thread """
        pass

    def _is_zero(self, *args, **kwargs): # real signature unknown
        """ returns whether semaphore has value zero """
        pass

    @classmethod
    def _rebuild(cls, *args, **kwargs): # real signature unknown
        pass

    def __enter__(self, *args, **kwargs): # real signature unknown
        """ enter the semaphore/lock """
        pass

    def __exit__(self, *args, **kwargs): # real signature unknown
        """ exit the semaphore/lock """
        pass

    def __init__(self, *args, **kwargs): # real signature unknown
        pass

    @staticmethod # known case of __new__
    def __new__(*args, **kwargs): # real signature unknown
        """ Create and return a new object.  See help(type) for accurate signature. """
        pass

    handle = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    kind = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    maxvalue = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    name = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default


    SEM_VALUE_MAX = 2147483647


# variables with complex values

flags = {}

__loader__ = None # (!) real value is '<_frozen_importlib_external.ExtensionFileLoader object at 0x00000294E24A8550>'

__spec__ = None # (!) real value is "ModuleSpec(name='_multiprocessing', loader=<_frozen_importlib_external.ExtensionFileLoader object at 0x00000294E24A8550>, origin='C:\\\\BuildAgent\\\\system\\\\.persistent_cache\\\\pycharm\\\\pythons4utils\\\\python38\\\\DLLs\\\\_multiprocessing.pyd')"
