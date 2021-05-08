#include <omp.h>
#include <stdio.h>

int main(void) {
#pragma omp parallel
  {
    int id = omp_get_thread_num();
    printf("hello %d!\n", id);
  }

  return 0;
}