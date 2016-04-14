#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#define FOR(i,a,b) for (i = (a); i < (b); i++)
#define N 8
#define INF 10000
char s[8][8];
double sc[10][10];
int me = 66, op = 87;
int dx[] = {0, 1, 0, -1, 1, 1, -1, -1};
int dy[] = {1, 0, -1, 0, 1, -1, 1, -1};
int qx[2][1000], qy[2][1000];
int out(int x, int y){ return x < 0 || y < 0 || x >= N || y >= N; }

int ok(int x, int y, int me, int op){
	if (s[x][y] != 0) return 0;
	int i,  k;
	FOR(i,0,8){
		FOR(k,1,8){
			int nx = x + dx[i] * k;
			int ny = y + dy[i] * k;
			if (out(nx, ny)) break;
			if (s[nx][ny] == 0) break;
			if (s[nx][ny] == me && k > 1) return 1;
			if (s[nx][ny] == me && k <= 1) break;
			if (s[nx][ny] == op) continue;
		}
	}
	return 0;
}

int update(int x, int y, int me, int op){
	if (s[x][y] != 0) return 0;
	s[x][y] = me;
	int i, k;
	FOR(i,0,8){
		int ok = 0;
		FOR(k,1,8){
			int nx = x + dx[i] * k;
			int ny = y + dy[i] * k;
			if (out(nx, ny)) break;
			if (s[nx][ny] == 0) break;
			if (s[nx][ny] == me && k > 1) ok = 1;
			if (s[nx][ny] == me && k <= 1) break;
			if (s[nx][ny] == op) continue;
		}
		if (!ok) continue;
		FOR(k,1,8){
			int nx = x + dx[i] * k;
			int ny = y + dy[i] * k;
			if (s[nx][ny] == me && k > 1) break;
			if (s[nx][ny] == op) s[nx][ny] = me;
		}
	}
	return 0;
}

double f(){
	int ret = 0, i, j;
	FOR(i,0,8) FOR(j,0,8) ret += sc[i][j] * s[i][j];
	return ret;
}

int end(){
	int i, j;
	FOR(i,0,8) FOR(j,0,8) if (ok(i, j, 1, -1) || ok(i, j, -1, 1)) return 0;
	return 1;
}

double find(int *x, int *y, int lv, int flag){
	if (end()){
		*x = *y = -1;
		return f() > 0 ? INF * flag : -INF * flag;
	}
	if (lv == 0) return f() * flag;
	int nx, ny, qx[100], qy[100], hi = 0, i, j;
	int me = flag, op = flag * -1;
	double tmp, ret = -INF - 1;
	FOR(i,0,8) FOR(j,0,8) if (ok(i, j, me, op)){
		qx[hi] = i;
		qy[hi++] = j;
	}
	if (!hi){
		*x = *y = -1;
		tmp = -find(&nx, &ny, lv, flag * -1);
		return tmp;
	}
	else{
		FOR(i,0,hi){
			char old[8][8];
			memcpy(old, s, sizeof(char) * 64);
			update(qx[i], qy[i], me, op);
			tmp = -find(&nx, &ny, lv - 1, flag * -1);
			if (tmp > ret){
				ret = tmp;
				*x = qx[i], *y = qy[i];
			}
			memcpy(s, old, sizeof(char) * 64);
		}
		return ret;
	}
}

int main(){
	int i, j;
	FOR(i,0,N) FOR(j,0,N) sc[i][j] = 0.5;
	FOR(i,1,N - 1) FOR(j,1,N - 1) sc[i][j] = 0.75;
	FOR(i,2,N - 2) FOR(j,2,N - 2) sc[i][j] = 1;
	FOR(i,3,N - 3) FOR(j,3,N - 3) sc[i][j] = 2;
	sc[0][0] = sc[0][7] = sc[7][0] = sc[7][7] = 1000;
	sc[1][0] = sc[1][1] = sc[1][6] = sc[6][1] = sc[6][6] = sc[0][1] = sc[0][6] = sc[6][0] = sc[7][1] = sc[1][7] = sc[6][7] = sc[7][6] = -2;
	while(1){
		int x, y;
		char s1[10], s2[10];
		if (scanf("%s%s", s1, s2) == EOF) break;
		me = s1[0], op = s2[0];
		FOR(i,0,8) scanf("%s", s[i]);
		FOR(i,0,8) FOR(j,0,8) s[i][j] = (s[i][j] == me ? 1 : (s[i][j] == op ? -1 : 0));
		me = 1, op = -1;
		x = 100, y = 100;
		find(&x, &y, 5, 1);
		printf("%d %d\n", x, y);
		FOR(i,0,8) FOR(j,0,8) if (s[i][j]) sc[i][j] = 1;
	}
	return 0;
}
